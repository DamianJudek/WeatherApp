import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Location from './Location';
import MainPanel from './MainPanel';
import NextDays from './NextDays';
export default class Weather extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    latitude: null,
    longitude: null,
    cityName: null,
    weatherFetched: false,
    phoneLocated: false,
    weather: {dataPerHour: []},
  };
  _apiAddress = 'http://api.openweathermap.org/data/2.5/forecast?';
  _apiKey = '15c1ecbcb9637c933c82bf1397cdf07b';
  _getLocation = () => {
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
        {enableHighAccuracy: true, timeout: 15000},
      );
    }
  };
  _parseWeatherData = (datas) => {
    const weather = {};
    weather.city = datas.city.name;
    weather.dataPerHour = [];
    for (const data of datas.list) {
      const perHour = {
        temp: parseInt(data.main.temp),
        humidity: data.main.humidity,
        description: data.weather[0].description,
        wind: data.wind.speed,
        hour: data.dt_txt.substr(-8, 5),
        date: data.dt,
        icon: data.weather[0].icon,
      };
      weather.dataPerHour.push(perHour);
    }
    this.setState({
      weather: weather,
      weatherFetched: true,
    });
  };
  _fetchDataFromApi = (url) => {
    const prevThis = this;
    console.log(url);
    fetch(url)
      .then((response) => {
        if (response.status) {
          return response.json();
        }
      })
      .then((datas) => {
        prevThis._parseWeatherData(datas);
        return datas;
      })
      .catch((error) => {
        throw new Error('Błąd połączenia z api ' + error.message);
      });
  };
  handleCityInput = (e) => {
    this.setState({cityName: e.nativeEvent.text});
  };
  getWeatherByCoords = () => {
    const lat = this.state.latitude;
    const lon = this.state.longitude;
    const phoneLocated = this.state.phoneLocated;
    if (phoneLocated) {
      let query = `${this._apiAddress}lat=${lat}&lon=${lon}&lang=PL&units=metric&appid=${this._apiKey}`;
      this._fetchDataFromApi(query);
    }
  };
  getWeatherByCity = () => {};

  componentDidMount() {
    this._getLocation();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.latitude !== this.state.latitude ||
      prevState.longitude !== this.state.longitude
    ) {
      this.getWeatherByCoords();
      console.log('update');
    } else if (prevState.cityName !== this.state.cityName) {
      console.log('Szukam po mieście');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Location
          getLocation={this._getLocation}
          handleCityInput={this.handleCityInput}></Location>
        <MainPanel
          weather={this.state.weather.dataPerHour.slice(0, 5)}
          weatherFetched={this.state.weatherFetched}
          city={this.state.weather.city}
        />
        <NextDays></NextDays>
      </View>
    );

    // <View style={styles.container}>
    //   <Image
    //     style={{width: 20, height: 20}}
    //     source={require('../assets/weather-icons/png/004-storm.png')}></Image>
    // </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexBasis: '100%',
    flexDirection: 'column',
    padding: 5,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  baseText: {
    fontFamily: 'Roboto',
    color: '#fff',
    fontSize: 22,
  },
  heading: {
    fontSize: 35,
  },
  thinText: {
    fontWeight: '100',
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: 'rgba(56, 149, 232, 0.6)',
    borderRadius: 50,
    marginVertical: 10,
  },
});
