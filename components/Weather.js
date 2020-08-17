import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import PropTypes from 'prop-types';
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
      phoneLocated: false,
      weather: {
        days: [],
        city: null,
        currenWeather: null,
        nearestHours: null,
      },
    };
  }

  static propTypes = {
    hasLocationPermission: PropTypes.bool,
  };

  apiAddress = 'http://api.openweathermap.org/data/2.5/forecast?';

  storageKey = '@WeatherApp:';

  apiKey = '15c1ecbcb9637c933c82bf1397cdf07b';

  getLocation = () => {
    if (this.props.hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
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
    const weatherPerHours = [];
    data.forEach((weatherLog) => {
      const hour = {
        temp: parseInt(weatherLog.main.temp, 10),
        humidity: weatherLog.main.humidity,
        description: weatherLog.weather[0].description,
        wind: weatherLog.wind.speed,
        hour: weatherLog.dt_txt.substr(-8, 5),
        icon: weatherLog.weather[0].icon,
        dayNumber: new Date(weatherLog.dt * 1000).getDay(),
      };
      weatherPerHours.push(hour);
    });
    return weatherPerHours;
  };

  savePersistentData = async (key = '', data = '') => {
    const { storageKey } = this;
    try {
      await AsyncStorage.setItem(`${storageKey}:${key}`, data);
    } catch (e) {
      console.error(`AsyncStorage error: ${e.message}`);
    }
  };

  getPersistentData = async (key) => {
    const { storageKey } = this;
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

  parseWeatherData = (data) => {
    const weather = {};
    const days = ['NIEDZ.', 'PON.', 'WT.', 'ŚR.', 'CZW.', 'PT.', 'SOB.'];
    weather.city = data.city.name;
    weather.days = [];
    const extractedData = this.extractWeatherData(data.list);
    [weather.currenWeather] = extractedData;
    weather.nearestHours = extractedData.slice(1, 5);
    let daysCounter = 0;
    for (let i = 0; i < extractedData.length; i += 1) {
      if (extractedData[i].hour === '00:00') {
        const day = {};
        day.maxTemp = extractedData[i + 5].temp;
        day.minTemp = extractedData[i + 9].temp;
        day.iconDay = extractedData[i + 5].icon;
        day.iconNight = extractedData[i + 9].icon;
        daysCounter += 1;
        day.name = days[extractedData[i + 5].dayNumber];
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
          })
          .then((data) => {
            parseWeatherData(data);
          })
          .catch((error) => {
            console.error(error);
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
    const query = `${this.apiAddress}lat=${lat}&lon=${lon}&lang=PL&units=metric&appid=${this.apiKey}`;
    this.fetchDataFromApi(query);
  };

  getWeatherByCity = (city) => {
    const query = `${this.apiAddress}q=${city}&lang=PL&units=metric&appid=${this.apiKey}`;
    this.fetchDataFromApi(query);
  };

  componentDidMount() {
    this.getPersistentData('city').then((city) => {
      if (city !== null) {
        this.getWeatherByCity(city);
      }
    });
  }

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
