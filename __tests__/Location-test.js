import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Location from '../components/Location';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
test('renders correctly', () => {
  const snap = renderer.create(<Location />).toJSON();
  expect(snap).toMatchSnapshot();
});
