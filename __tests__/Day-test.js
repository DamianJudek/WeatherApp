import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Day from '../components/Day';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
test('renders correctly', () => {
  const snap = renderer
    .create(
      <Day
        style={{
          borderColor: '#fff',
          borderRightWidth: 1,
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: '2%',
        }}
        weather={{
          iconDay: '10d',
          iconNight: '04n',
          maxTemp: 18,
          minTemp: 11,
          name: 'SOB.',
        }}
      />,
    )
    .toJSON();
  expect(snap).toMatchSnapshot();
});
