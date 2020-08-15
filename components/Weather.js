import React from 'react';
import { View, StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
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
      weather: { dataPerHour: [] },
    };
  }

  apiAddress = 'http://api.openweathermap.org/data/2.5/forecast?';

  apiKey = '15c1ecbcb9637c933c82bf1397cdf07b';

  getLocation = () => {
    if (this.props.hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            phoneLocated: true,
          });
        },
        (error) => {
          // See error code charts below.
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
        day.icon = extractedData[i + 5].icon;
        daysCounter += 1;
        day.name = days[extractedData[i + 5].dayNumber];
        weather.days.push(day);
      }
      if (daysCounter === 4) {
        break;
      }
    }
    this.setState({
      weather,
      weatherFetched: true,
    });
  };

  fetchDataFromApi = (url) => {
    const that = this;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Api returns code ${response.status}`);
      })
      .then((data) => {
        that.parseWeatherData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleCityInput = (e) => {
    this.setState({ cityName: e.nativeEvent.text });
  };

  getWeatherByCoords = () => {
    const lat = this.state.latitude;
    const lon = this.state.longitude;
    const { phoneLocated } = this.state;
    if (phoneLocated) {
      const query = `${this.apiAddress}lat=${lat}&lon=${lon}&lang=PL&units=metric&appid=${this.apiKey}`;
      this.fetchDataFromApi(query);
    }
  };

  getWeatherByCity = () => {
    if (this.state.cityName !== null) {
      const query = `${this.apiAddress}q=${this.state.cityName}&lang=PL&units=metric&appid=${this.apiKey}`;
      this.fetchDataFromApi(query);
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.latitude !== this.state.latitude ||
      prevState.longitude !== this.state.longitude
    ) {
      this.getWeatherByCoords();
      console.log('update');
    } else if (prevState.cityName !== this.state.cityName) {
      console.log('Szukam po mieście ');
      this.getWeatherByCity();
    }
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
