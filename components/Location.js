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

class Location extends React.Component {
  static propTypes = {
    handleCityInput: PropTypes.func,
    getLocation: PropTypes.func,
  };

  render() {
    return (
      <View style={styles.container}>
        <ASBox handleCityInput={this.props.handleCityInput} />
        <TouchableHighlight
          onPress={this.props.getLocation}
          underlayColor="rgba(95, 158, 160, 0.3)"
          style={styles.iconContainer}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={locationIcon}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

export default Location;
