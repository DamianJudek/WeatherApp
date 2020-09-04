import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import TodayPerHour from '../components/TodayPerHour';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
test('renders correctly', () => {
  const snap = renderer
    .create(
      <TodayPerHour
        weather={[
          {
            dayNumber: 5,
            description: 'clouds',
            hour: '21:00',
            humidity: 87,
            icon: '03n',
            temp: 17,
            wind: 2.22,
          },
          {
            dayNumber: 6,
            description: 'clouds',
            hour: '00:00',
            humidity: 91,
            icon: '04n',
            temp: 16,
            wind: 2.78,
          },
          {
            dayNumber: 6,
            description: 'rain',
            hour: '03:00',
            humidity: 93,
            icon: '03n',
            temp: 15,
            wind: 3.02,
          },
          {
            dayNumber: 6,
            description: 'rain',
            hour: '06:00',
            humidity: 88,
            icon: '03d',
            temp: 17,
            wind: 2.93,
          },
        ]}
      />,
    )
    .toJSON();
  expect(snap).toMatchSnapshot();
});
