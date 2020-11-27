import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Hour from './Hour';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(220, 220, 220, 0.2)',

    padding: 15,
  },
  section: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastSection: {
    borderRightWidth: 0,
  },
});


const TodayPerHour = ({ weather }) => {
  
  return (
    <View style={styles.container}>
      <Hour weather={weather[0]} style={styles.section} />
      <Hour weather={weather[1]} style={styles.section} />
      <Hour weather={weather[2]} style={styles.section} />
      <Hour weather={weather[3]} style={[styles.section, styles.lastSection]} />
    </View>
  );
};

TodayPerHour.propTypes = {
  weather: PropTypes.array,
};

export default TodayPerHour;
