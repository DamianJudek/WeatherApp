import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

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

const Hour = (props) => {
  const { weather, style } = props;
  return (
    <View style={style}>
      <Text style={styles.baseText}>{weather.hour}</Text>
      <Image
        style={styles.icon}
        resizeMode="contain"
        source={{
          uri: `http://openweathermap.org/img/wn/${weather.icon}@2x.png`,
        }}
      />
      <Text style={styles.baseText}>{`${weather.temp}\u2103`}</Text>
    </View>
  );
};
Hour.propTypes = {
  weather: PropTypes.object,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
export default Hour;
