import React from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

class FadeInView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    children: PropTypes.array,
  };

  fadeIn = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 750,
      useNativeDriver: true,
    }).start();
  };

  componentDidMount() {
    this.fadeIn();
  }

  render() {
    return (
      <Animated.View
        style={[
          this.props.style,
          {
            opacity: this.state.opacity,
            transform: [
              {
                translateY: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [35, 0],
                }),
              },
            ],
          },
        ]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

export default FadeInView;
