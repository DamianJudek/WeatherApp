import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TodayMain from './TodayMain';
import TodayPerHour from './TodayPerHour';

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

class MainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentWeather, nearestHours, city } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <TodayMain city={city} weather={currentWeather} />
          <TodayPerHour weather={nearestHours} />
        </View>
      </View>
    );
  }
}

export default MainPanel;
