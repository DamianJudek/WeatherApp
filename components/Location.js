import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';

class Location extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => {}}
          underlayColor="rgba(95, 158, 160, 0.3)"
          style={styles.iconContainer}
          style={styles.iconContainer}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require('../assets/icons/search.png')}></Image>
        </TouchableHighlight>

        <View style={styles.searchBox}></View>
        <TouchableHighlight
          onPress={this.props.getLocation}
          underlayColor="rgba(95, 158, 160, 0.3)"
          style={styles.iconContainer}
          style={styles.iconContainer}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require('../assets/icons/gps.png')}></Image>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(50, 50, 50, 0.3)',
  },
  icon: {
    height: 20,
    width: 20,
  },
  iconContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: 'transparent',
  },
  searchBox: {
    backgroundColor: 'rgba(95, 158, 160, 0.4)',
    height: '100%',
    width: 0,
  },
  baseText: {
    fontFamily: 'Roboto',
    color: '#fff',
    fontSize: 22,
  },
  heading: {
    fontSize: 35,
  },
});
export default Location;
