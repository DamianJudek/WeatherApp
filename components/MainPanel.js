import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TodayMain from './TodayMain';
import TodayPerHour from './TodayPerHour';

class MainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const weather = this.props.weather;
    const weatherFetched = this.props.weatherFetched;
    return (
      <View style={styles.container}>
        {weatherFetched ? (
          <View style={styles.container}>
            <TodayMain city={this.props.city} weather={weather[0]} />
            <TodayPerHour weather={weather} />
          </View>
        ) : (
          <>
            <Text style={[styles.baseText, styles.heading]}>
              Wyszukaj miasto
            </Text>
            <Text
              style={[
                { textAlign: 'center' },
                styles.baseText,
                styles.thinText,
              ]}>
              lub
            </Text>
            <Text style={[styles.baseText, styles.heading]}>
              użyj lokalizacji
            </Text>
          </>
        )}
      </View>
    );
  }
}
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

export default MainPanel;
