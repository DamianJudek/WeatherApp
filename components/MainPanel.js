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

class MainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    currentWeather: PropTypes.object,
    nearestHours: PropTypes.array,
    city: PropTypes.string,
  };

  render() {
    const { currentWeather, nearestHours, city } = this.props;
    return (
      <FadeInView delay={0} style={styles.container}>
        <View style={styles.container}>
          <TodayMain city={city} weather={currentWeather} />
          <TodayPerHour weather={nearestHours} />
        </View>
      </FadeInView>
    );
  }
}

export default MainPanel;
