/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  ImageBackground,
} from 'react-native';
import bgImage from './assets/background-images/sky.jpg';
import Weather from './components/Weather';

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLocationPermission: false,
    };
  }

  requestLocationPermission = async () => {
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Hey! We need your permission to use your location',
        message: 'Cool weather App needs access to your location ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    this.setState({
      isLocationPermission:
        fineLocationPermission === PermissionsAndroid.RESULTS.GRANTED,
    });
  };

  componentDidMount() {
    this.requestLocationPermission();
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={bgImage}
          resizeMode="cover">
          <Weather
            isLocationPermission={this.state.isLocationPermission}></Weather>
        </ImageBackground>
      </View>
    );
  }
}

export default App;
