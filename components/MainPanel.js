import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import TodayMain from './TodayMain';
import TodayPerHour from './TodayPerHour';
import FadeInView from './FadeInView';

const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  baseText: {
    fontFamily: 'Roboto',
    color: '#fff',
    fontSize: 22,
  },
  heading: {
    textAlign: 'center',
    fontSize: 35,
  },
  thinText: {
    fontWeight: '100',
  },
});

const MainPanel = ({ currentWeather, nearestHours, city }) => (
  <FadeInView delay={0} style={styles.container}>
    <View style={styles.container}>
      <TodayMain city={city} weather={currentWeather} />
      <TodayPerHour weather={nearestHours} />
    </View>
  </FadeInView>
);

MainPanel.propTypes = {
  currentWeather: PropTypes.object,
  nearestHours: PropTypes.array,
  city: PropTypes.string,
};

export default MainPanel;
