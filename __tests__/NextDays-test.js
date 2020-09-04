import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NextDays from '../components/NextDays';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
test('renders correctly', () => {
  const snap = renderer
    .create(
      <NextDays
        days={[
          {
            iconDay: '10d',
            iconNight: '04n',
            maxTemp: 18,
            minTemp: 11,
            name: 'Mon.',
          },
          {
            iconDay: '04d',
            iconNight: '04n',
            maxTemp: 17,
            minTemp: 11,
            name: 'Tue.',
          },
          {
            iconDay: '01d',
            iconNight: '01n',
            maxTemp: 17,
            minTemp: 10,
            name: 'Wed.',
          },
          {
            iconDay: '04d',
            iconNight: '01n',
            maxTemp: 19,
            minTemp: 11,
            name: 'Thu.',
          },
        ]}
      />,
    )
    .toJSON();
  expect(snap).toMatchSnapshot();
});
