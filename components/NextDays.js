import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Day from './Day';
import FadeInView from './FadeInView';

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
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

const NextDays = ({ days }) => {
  const [firstDay, secondDay, thirdDay, fourthDay] = days;
  return (
    <View style={styles.container}>
      <Day style={styles.section} weather={firstDay} />
      <Day style={styles.section} weather={secondDay} />
      <Day style={styles.section} weather={thirdDay} />
      <Day
        style={[styles.section, { borderRightWidth: 0 }]}
        weather={fourthDay}
      />
    </View>
  );
};




  render() {
    const [first, second, third, fourth] = days;
    return (
      <FadeInView delay={600} style={styles.container}>
        <Day style={styles.section} weather={first} />
        <Day style={styles.section} weather={second} />
        <Day style={styles.section} weather={third} />
        <Day style={[styles.section, styles.lastSection]} weather={fourth} />
      </FadeInView>
    );
  }
}

NextDays.propTypes = {
  days: PropTypes.array,
};


export default NextDays;
