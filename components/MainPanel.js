import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class MainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const weather = this.props.weather;
    return (
      <View style={styles.container}>
        <View>
          <Text>To jest panel główny</Text>
        </View>
        {/* <View>
          <Text style={[styles.thinText, styles.baseText]}>
            {`${weather.dataPerHour[0].temp} \u2103`}
          </Text>
        </View>
        <View>
          <Text style={styles.baseText}>
            {weather.dataPerHour[0].description}
          </Text>
        </View>
        <View>
          <View>
            <Text
              style={[
                styles.thinText,
                styles.baseText,
              ]}>{`Wiatr: ${weather.dataPerHour[0].wind} m/s`}</Text>
          </View>
          <View>
            <Text
              style={[
                styles.thinText,
                styles.baseText,
              ]}>{`Wilgotność: ${weather.dataPerHour[0].humidity}%`}</Text>
          </View>
        </View> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 140, 0, 0.3)',
  },
});

export default MainPanel;
