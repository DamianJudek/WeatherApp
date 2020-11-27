import React from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import FadeInView from './FadeInView';

const styles = StyleSheet.create({
  icon: {
    height: 60,
    width: 60,
  },
  baseText: {
    fontFamily: 'Roboto',
    color: '#fff',
    fontSize: 18,
  },
});


const Hour = ({ weather, style }) => {
  return (
    <FadeInView style={style}>
      <Text style={styles.baseText}>{weather.hour}</Text>
      <Image
        style={styles.icon}
        resizeMode="contain"
        source={{
          uri: `http://openweathermap.org/img/wn/${weather.icon}@2x.png`,
        }}
      />
      <Text style={styles.baseText}>{`${weather.temp}\u2103`}</Text>
    </FadeInView>
  );
};

Hour.propTypes = {
  weather: PropTypes.object,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
export default Hour;
