import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Roboto',
    color: '#fff',
    fontSize: 18,
  },
  heading: {
    fontSize: 35,
  },
});

const Welcome = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={[styles.baseText, styles.heading]}>Wyszukaj miasto</Text>
    <Text style={[{ textAlign: 'center' }, styles.baseText]}>lub</Text>
    <Text style={[styles.baseText, styles.heading]}>użyj lokalizacji</Text>
  </View>
);

export default Welcome;
