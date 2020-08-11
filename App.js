/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
  ImageBackground,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Weather from './components/Weather.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    hasLocationPermission: false,
  };

  _requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Hey! We need your permission to use your location',
          message: 'Cool weather App needs access to your location ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        this.setState({hasLocationPermission: true});
      } else {
        console.log('Location permission denied');
        this.setState({hasLocationPermission: false});
      }
    } catch (err) {
      console.warn(err);
      this.setState({hasLocationPermission: false});
    }
  };
  componentDidMount() {
    this._requestLocationPermission();
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require('./assets/background-images/sky.jpg')}
          resizeMode="cover">
          <Weather
            hasLocationPermission={this.state.hasLocationPermission}></Weather>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  background: {
    flex: 1,
    flexDirection: 'column',
  },
  baseText: {
    fontFamily: 'Roboto',
    color: '#fff',
    fontSize: 18,
  },
});

export default App;
