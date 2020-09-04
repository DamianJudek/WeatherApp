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
    backgroundColor: 'rgba(100, 100, 100, 0.3)',
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
      active: false,
      textInput: React.createRef(),
    };
  }

  static propTypes = {
    handleCityInput: PropTypes.func,
  };

  focusTextInput = () => {
    this.state.textInput.current.focus();
  };

  blurTextInput = () => {
    this.state.textInput.current.blur();
  };

  onPress = () => {
    if (this.state.active === true) {
      this.blurTextInput();
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
      this.focusTextInput();
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
            ref={this.state.textInput}
            autoCorrect={false}
            placeholderTextColor="#fff"
            style={
              this.state.active ? styles.inputActive : styles.inputInactive
            }
            placeholder={this.state.active ? 'Miasto' : ''}
          />
        </Animated.View>
      </>
    );
  }
}

export default AnimatedSearchBox;
