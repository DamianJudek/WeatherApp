import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  icon: {
    height: 55,
    width: 55,
  },
  floatRight: {
    alignSelf: 'flex-end',
  },
  floatleft: {
    alignSelf: 'flex-start',
  },
  baseText: {
    fontFamily: 'Roboto',
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  smallText: {
    fontFamily: 'Roboto',
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

const Day = (props) => {
  const { weather, style } = props;

  return (
    <View style={style}>
      <Text style={styles.baseText}>{weather.name}</Text>

      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          //   backgroundColor: 'rgba(0,0,100,0.4)',
        }}>
        <Image
          style={styles.icon}
          resizeMode="contain"
          source={{
            uri: `http://openweathermap.org/img/wn/${weather.iconDay}@2x.png`,
          }}
        />
        <Text
          style={[
            styles.smallText,
            styles.floatleft,
          ]}>{`${weather.maxTemp}\u2103`}</Text>
        <View
          style={{
            width: '100%',
            height: 0,
            borderTopWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            rotation: -45,
          }}></View>
        <Text
          style={[
            styles.smallText,
            styles.floatRight,
          ]}>{`${weather.minTemp}\u2103`}</Text>
        <Image
          style={[styles.icon, styles.floatRight]}
          resizeMode="contain"
          source={{
            uri: `http://openweathermap.org/img/wn/${weather.iconNight}@2x.png`,
          }}
        />
      </View>
    </View>
  );
};

export default Day;
