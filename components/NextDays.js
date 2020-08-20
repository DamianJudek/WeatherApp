import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Day from './Day';

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  section: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: '2%',
  },
  lastSection: {
    borderRightWidth: 0,
  },
});

class NextDays extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    days: PropTypes.array,
  };

  render() {
    const [first, second, third, fourth] = this.props.days;
    return (
      <View style={styles.container}>
        <Day style={styles.section} weather={first} />
        <Day style={styles.section} weather={second} />
        <Day style={styles.section} weather={third} />
        <Day style={[styles.section, styles.lastSection]} weather={fourth} />
      </View>
    );
  }
}

export default NextDays;
