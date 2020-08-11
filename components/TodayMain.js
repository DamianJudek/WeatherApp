import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import City from './City';
const TodayMain = (props) => {
  const {humidity, temp, wind, description, icon} = props.weather;
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.baseText, styles.heading]}>{props.city}</Text>
      </View>

      <View style={styles.section}>
        <View style={[styles.subSection, {flex: 2}]}>
          <Text style={[styles.baseText, styles.bigText]}>
            {`${temp}\u2103`}
          </Text>
        </View>
        <View style={styles.subSection}>
          <Image
            style={styles.bigIcon}
            resizeMode="contain"
            source={{
              uri: `http://openweathermap.org/img/wn/${icon}@2x.png`,
            }}></Image>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.baseText, styles.heading]}>{description}</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.subSection}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require('../assets/icons/humidity.png')}></Image>
          <Text
            style={[styles.baseText, styles.heading]}>{`${humidity}%`}</Text>
        </View>
        <View style={styles.subSection}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require('../assets/icons/wind.png')}></Image>
          <Text style={[styles.baseText, styles.heading]}>{`${wind}m/s`}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flexDirection: 'column',
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
  },
  subSection: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'cadetblue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  baseText: {
    fontFamily: 'Roboto',
    color: '#fff',
    fontSize: 35,
  },
  bigText: {
    fontSize: 95,
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  bigIcon: {
    height: 120,
    width: 120,
  },
});
export default TodayMain;
// <View>
//   <View>
//     <Text style={[styles.thinText, styles.baseText]}>
//       {`${weather.temp} \u2103`}
//     </Text>
//   </View>
//   <View>
//     <Text style={styles.baseText}>{weather.description}</Text>
//   </View>
//   <View>
//     <View>
//       <Text
//         style={[
//           styles.thinText,
//           styles.baseText,
//         ]}>{`Wiatr: ${weather.wind} m/s`}</Text>
//     </View>
//     <View>
//       <Text
//         style={[
//           styles.thinText,
//           styles.baseText,
//         ]}>{`Wilgotność: ${weather.humidity}%`}</Text>
//     </View>
//   </View>
// </View>
