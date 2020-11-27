import React from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

class SlideInView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    children: PropTypes.array,
    delay: PropTypes.number,
  };

  fadeIn = () => {
    const { delay } = this.props;
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 750,
      useNativeDriver: true,
      delay: delay || 0,
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

export default SlideInView;
