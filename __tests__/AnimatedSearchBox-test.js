import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import AnimatedSearchBox from '../components/AnimatedSearchBox';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

test('renders correctly', () => {
  const snap = renderer.create(<AnimatedSearchBox />).toJSON();
  expect(snap).toMatchSnapshot();
});
