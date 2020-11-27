import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import humidityIcon from '../assets/icons/humidity.png';
import windIcon from '../assets/icons/wind.png';

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: 'rgba(30, 30, 30, 0.4)',
    flexDirection: 'column',
    borderRadius: 50,
    marginVertical: 10,
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  wide: {
    flex: 2,
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
    height: '60%',
    marginRight: 10,
  },
  bigIcon: {
    height: '100%',
    width: '100%',
  },
});

const TodayMain = ({
  weather: { humidity, temp, wind, description, icon },
  city,
}) => (
  <View style={styles.container}>
    <View style={styles.section}>
      <Text style={[styles.baseText, styles.heading]}>{city}</Text>
    </View>
    <View style={[styles.section, styles.wide]}>
      <View style={[styles.subSection, styles.wide]}>
        <Text style={[styles.baseText, styles.bigText]}>{`${temp}\u2103`}</Text>
      </View>
      <View style={styles.subSection}>
        <Image
          style={styles.bigIcon}
          resizeMode="contain"
          source={{
            uri: `http://openweathermap.org/img/wn/${icon}@2x.png`,
          }}
        />
      </View>
    </View>
    <View style={styles.section}>
      <Text style={[styles.baseText, styles.heading]}>{description}</Text>
    </View>
    <View style={styles.section}>
      <View style={styles.subSection}>
        <Image style={styles.icon} resizeMode="contain" source={humidityIcon} />
        <Text style={[styles.baseText, styles.heading]}>{`${humidity}%`}</Text>
      </View>
      <View style={styles.subSection}>
        <Image style={styles.icon} resizeMode="contain" source={windIcon} />
        <Text style={[styles.baseText, styles.heading]}>{`${wind}m/s`}</Text>
      </View>
    </View>
  </View>
);

TodayMain.propTypes = {
  weather: PropTypes.object,
  city: PropTypes.string,
};

export default TodayMain;
