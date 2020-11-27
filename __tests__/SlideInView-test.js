import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import SlideInView from '../components/SlideInView';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
test('renders correctly', () => {
  const snap = renderer.create(<SlideInView />).toJSON();
  expect(snap).toMatchSnapshot();
});
