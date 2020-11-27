import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import ASBox from './AnimatedSearchBox';
import locationIcon from '../assets/icons/gps.png';

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(50, 50, 50, 0.3)',
  },
  icon: {
    height: 20,
    width: 20,
  },
  iconContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: 'transparent',
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

const Location = ({ handleCityInput, getLocation }) => (
  <View style={styles.container}>
    <ASBox handleCityInput={handleCityInput} />
    <TouchableHighlight
      onPress={getLocation}
      underlayColor="rgba(95, 158, 160, 0.3)"
      style={styles.iconContainer}>
      <Image style={styles.icon} resizeMode="contain" source={locationIcon} />
    </TouchableHighlight>
  </View>
);

Location.propTypes = {
  handleCityInput: PropTypes.func,
  getLocation: PropTypes.func,
};

export default Location;
