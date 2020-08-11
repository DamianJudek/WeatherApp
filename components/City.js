import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const City = (props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.baseText, styles.heading]}>Miasto</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 170, 0.6)',
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
});
export default City;
