import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from '../components/WelcomeScreen';

test('renders correctly', () => {
  const snap = renderer.create(<WelcomeScreen />).toJSON();
  expect(snap).toMatchSnapshot();
});
