import React from 'react';
import { View, StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Location from './Location';
import MainPanel from './MainPanel';
import NextDays from './NextDays';

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

  parseWeatherData = (datas) => {
    const weather = {};
    weather.city = datas.city.name;
    weather.dataPerHour = [];

    for (const data of datas) {
      const perHour = {
        temp: parseInt(data.main.temp, 10),
        humidity: data.main.humidity,
        description: data.weather[0].description,
        wind: data.wind.speed,
        hour: data.dttxt.substr(-8, 5),
        date: data.dt,
        icon: data.weather[0].icon,
      };
      weather.dataPerHour.push(perHour);
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
    return (
      <View style={styles.container}>
        <Location
          getLocation={this.getLocation}
          handleCityInput={this.handleCityInput}
        />
        <MainPanel
          weather={this.state.weather.dataPerHour.slice(0, 5)}
          weatherFetched={this.state.weatherFetched}
          city={this.state.weather.city}
        />
        <NextDays />
      </View>
    );
  }
}
