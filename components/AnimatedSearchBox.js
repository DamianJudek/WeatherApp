import React from 'react';
import {
  Animated,
  Image,
  TouchableHighlight,
  StyleSheet,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import searchIcon from '../assets/icons/search.png';

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
  inputActive: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
  inputInactive: { width: 0, padding: 0 },
});

class AnimatedSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
      inputVisible: false,
    };
  }

  static propTypes = {
    handleCityInput: PropTypes.func,
  };

  onPress = () => {
    if (this.state.inputVisible === true) {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 800,
        useNativeDriver: false,
      }).start();
      this.setState({ inputVisible: false });
    } else if (this.state.inputVisible === false) {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }).start();
      this.setState({ inputVisible: true });
    }
  };

  render() {
    return (
      <>
        <TouchableHighlight
          onPress={this.onPress}
          underlayColor="rgba(95, 158, 160, 0.3)"
          style={styles.iconContainer}>
          <Image style={styles.icon} resizeMode="contain" source={searchIcon} />
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

              this.state.active ? styles.inputActive : styles.inputInactive

            }
            placeholder={this.state.inputVisible ? 'Miasto' : ''}
          />
        </Animated.View>
      </>
    );
  }
}

export default AnimatedSearchBox;
