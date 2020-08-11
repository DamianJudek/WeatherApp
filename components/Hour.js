import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
const Hour = (props) => {
  const {weather} = props;
  return (
    <View style={props.style}>
      <Text style={styles.baseText}>{weather.hour}</Text>
      <Image
        style={styles.icon}
        resizeMode="contain"
        source={{
          uri: `http://openweathermap.org/img/wn/${weather.icon}@2x.png`,
        }}></Image>
      <Text style={styles.baseText}>{`${weather.temp}\u2103`}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    height: 60,
    width: 60,
  },
  baseText: {
    fontFamily: 'Roboto',
    color: '#fff',
    fontSize: 18,
  },
});
export default Hour;