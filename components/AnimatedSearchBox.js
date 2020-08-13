import React from 'react';
import {
  Animated,
  Image,
  TouchableHighlight,
  StyleSheet,
  TextInput,
} from 'react-native';

const styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
  },
  iconContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: 'transparent',
  },
  searchBox: {
    backgroundColor: 'rgba(95, 158, 160, 0.4)',
    height: 50,
  },
});

class AnimatedSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
      active: false,
    };
  }

  onPress = () => {
    if (this.state.active === true) {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 800,
        useNativeDriver: false,
      }).start();
      this.setState({ active: false });
    } else if (this.state.active === false) {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }).start();
      this.setState({ active: true });
    }
  };

  render() {
    return (
      <>
        <TouchableHighlight
          onPress={this.onPress}
          underlayColor="rgba(95, 158, 160, 0.3)"
          style={styles.iconContainer}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require('../assets/icons/search.png')}
          />
        </TouchableHighlight>
        <Animated.View
          style={{
            flex: this.state.animation,
            ...styles.searchBox,
          }}>
          <TextInput
            onSubmitEditing={(e) => {
              this.props.handleCityInput(e);
              this.onPress();
            }}
            autoCorrect={false}
            placeholderTextColor="#fff"
            style={
              this.state.active
                ? {
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 16,
                    color: '#fff',
                  }
                : { width: 0, padding: 0 }
            }
            placeholder={this.state.active ? 'Miasto' : ''}
          />
        </Animated.View>
      </>
    );
  }
}

export default AnimatedSearchBox;
