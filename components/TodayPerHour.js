import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Hour from './Hour';

const TodayPerHour = (props) => {
  const {weather} = props;
  return (
    <View style={styles.container}>
      <Hour weather={weather[0]} style={styles.section}></Hour>
      <Hour weather={weather[1]} style={styles.section}></Hour>
      <Hour weather={weather[2]} style={styles.section}></Hour>
      <Hour
        weather={weather[3]}
        style={[styles.section, {borderRightWidth: 0}]}></Hour>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(220, 220, 220, 0.2)',
    // backgroundColor: 'rgba(30, 30, 30, 0.4)',

    padding: 15,
  },
  section: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default TodayPerHour;
