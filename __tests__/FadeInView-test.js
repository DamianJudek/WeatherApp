import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import FadeInView from '../components/FadeInView';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
test('renders correctly', () => {
  const snap = renderer.create(<FadeInView />).toJSON();
  expect(snap).toMatchSnapshot();
});
