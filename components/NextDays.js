import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class NextDays extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>To jest panel nastepnych dni</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(255, 0, 0, 0.3)',
  },
});
export default NextDays;
