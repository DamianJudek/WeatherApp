import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import SlideInView from './SlideInView';

const styles = StyleSheet.create({
  icon: {
    height: 55,
    width: 55,
  },
  floatRight: {
    alignSelf: 'flex-end',
  },
  floatleft: {
    alignSelf: 'flex-start',
  },
  baseText: {
    fontFamily: 'Roboto',
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  smallText: {
    fontFamily: 'Roboto',
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  partition: {
    width: '100%',
    height: 0,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    transform: [
      {
        rotate: '-45deg',
      },
    ],
  },
  block: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Day = ({ weather, style }) => (
  <SlideInView delay={900} style={style}>
    <Text style={styles.baseText}>{weather.name}</Text>

    <View style={styles.block}>
      <Image
        style={[styles.icon, styles.floatleft]}
        resizeMode="contain"
        source={{
          uri: `http://openweathermap.org/img/wn/${weather.iconDay}@2x.png`,
        }}
      />
      <Text
        style={[
          styles.smallText,
          styles.floatleft,
        ]}>{`${weather.maxTemp}\u2103`}</Text>
      <View style={styles.partition}></View>
      <Text
        style={[
          styles.smallText,
          styles.floatRight,
        ]}>{`${weather.minTemp}\u2103`}</Text>
      <View>
        <Image
          style={[styles.icon, styles.floatRight]}
          resizeMode="contain"
          source={{
            uri: `http://openweathermap.org/img/wn/${weather.iconNight}@2x.png`,
          }}
        />
      </View>
    </View>
  </SlideInView>
);

Day.propTypes = {
  weather: PropTypes.object,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Day;
