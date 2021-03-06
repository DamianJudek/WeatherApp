import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import PropTypes from 'prop-types';
import config from '../app.config';
import Location from './Location';
import MainPanel from './MainPanel';
import NextDays from './NextDays';
import Welcome from './WelcomeScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    justifyContent: 'center',
  },
  baseText: {
    fontFamily: 'Roboto',
    color: '#fff',
    fontSize: 22,
  },
  heading: {
    fontSize: 35,
  },
});

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      cityName: null,
      weatherFetched: false,
      weather: {
        days: [],
        city: null,
        currenWeather: null,
        nearestHours: null,
      },
    };
  }

  static propTypes = {
    isLocationPermission: PropTypes.bool,
  };

  componentDidMount() {
    this.getPersistentData('city').then((city) => {
      if (city !== null) {
        this.getWeatherByCity(city);
      }
    });
  }

  getLocation = () => {
    if (this.props.isLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.getWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000 },
      );
    }
  };

  extractWeatherData = (data) => {
    const weatherPerHours = data.map((weatherLog) => {
      const hour = {
        temp: parseInt(weatherLog.main.temp, 10),
        humidity: weatherLog.main.humidity,
        description: weatherLog.weather[0].description,
        wind: weatherLog.wind.speed,
        hour: weatherLog.dt_txt.substr(-8, 5),
        icon: weatherLog.weather[0].icon,
        dayNumber: new Date(weatherLog.dt * 1000).getDay(),
      };
      return hour;
    });
    return weatherPerHours;
  };

  savePersistentData = async (key = '', data = '') => {
    const { storageKey } = config;
    try {
      await AsyncStorage.setItem(`${storageKey}:${key}`, data);
    } catch (e) {
      console.error(`AsyncStorage error: ${e.message}`);
    }
  };

  getPersistentData = async (key) => {
    const { storageKey } = config;
    try {
      const value = await AsyncStorage.getItem(`${storageKey}:${key}`);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.error(`AsyncStorage error: ${e.message}`);
    }
    return null;
  };

  parseWeatherData = ({ city: { name }, list }) => {
    const weather = {};
    const days = ['NIEDZ.', 'PON.', 'WT.', 'ŚR.', 'CZW.', 'PT.', 'SOB.'];
    weather.city = name;
    weather.days = [];
    const extractedData = this.extractWeatherData(list);
    [weather.currenWeather] = extractedData;
    weather.nearestHours = extractedData.slice(1, 5);
    let daysCounter = 0;
    for (let i = 0; i < extractedData.length; i += 1) {
      if (extractedData[i].hour === '00:00') {
        const day = {};
        const midday = extractedData[i + 5];
        const night = extractedData[i + 9];
        day.maxTemp = midday.temp;
        day.minTemp = night.temp;
        day.iconDay = midday.icon;
        day.iconNight = night.icon;
        daysCounter += 1;
        day.name = days[midday.dayNumber];
        weather.days.push(day);
      }
      if (daysCounter === 4) {
        break;
      }
    }
    this.savePersistentData('city', weather.city);
    this.setState({
      weather,
      weatherFetched: true,
    });
  };

  fetchDataFromApi = (url) => {
    const { parseWeatherData } = this;
    NetInfo.fetch().then((status) => {
      if (status.isConnected === true) {
        fetch(url)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error();
          })
          .then((data) => {
            parseWeatherData(data);
          })
          .catch(() => {
            Alert.alert(
              'Uwaga!',
              'Nie odnaleziono pogody dla żadanej lokalizacji',
            );
          });
      } else {
        Alert.alert('Uwaga!', 'Brak połączenia internetowego');
      }
    });
  };

  handleCityInput = (e) => {
    this.getWeatherByCity(e.nativeEvent.text);
  };

  getWeatherByCoords = (lat, lon) => {
    const url = new URL(config.apiAddress);
    url.searchParams.append('lat', lat);
    url.searchParams.append('lon', lon);
    url.searchParams.append('lang', 'PL');
    url.searchParams.append('units', 'metric');
    url.searchParams.append('appid', config.apiKey);
    this.fetchDataFromApi(url);
  };

  getWeatherByCity = (city) => {
    const url = new URL(config.apiAddress);
    url.searchParams.append('q', city);
    url.searchParams.append('lang', 'PL');
    url.searchParams.append('units', 'metric');
    url.searchParams.append('appid', config.apiKey);
    this.fetchDataFromApi(url);
  };

  render() {
    const { weather, weatherFetched } = this.state;
    return (
      <View style={styles.container}>
        {weatherFetched ? (
          <>
            <Location
              getLocation={this.getLocation}
              handleCityInput={this.handleCityInput}
            />
            <MainPanel
              currentWeather={weather.currenWeather}
              weatherFetched={this.state.weatherFetched}
              city={this.state.weather.city}
              nearestHours={weather.nearestHours}
            />
            <NextDays days={weather.days} />
          </>
        ) : (
          <>
            <Location
              getLocation={this.getLocation}
              handleCityInput={this.handleCityInput}
            />
            <Welcome />
          </>
        )}
      </View>
    );
  }
}
