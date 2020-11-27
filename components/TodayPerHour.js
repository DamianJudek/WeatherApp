import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Hour from './Hour';
import FadeInView from './FadeInView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 50,

    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    // backgroundColor: 'rgba(30, 30, 30, 0.4)',
//tutaj bylo wczesniej
//     backgroundColor: 'rgba(220, 220, 220, 0.2)',


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
    <FadeInView delay={300} style={styles.container}>
      <Hour weather={weather[0]} style={styles.section} />
      <Hour weather={weather[1]} style={styles.section} />
      <Hour weather={weather[2]} style={styles.section} />
      <Hour weather={weather[3]} style={[styles.section, styles.lastSection]} />
    </FadeInView>
  );
};

TodayPerHour.propTypes = {
  weather: PropTypes.array,
};

export default TodayPerHour;
