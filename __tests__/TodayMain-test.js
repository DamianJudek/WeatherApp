import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import TodayMain from '../components/TodayMain';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
test('renders correctly', () => {
  const snap = renderer
    .create(
      <TodayMain
        city={'Poznań'}
        weather={{
          dayNumber: 5,
          description: 'rain',
          hour: '18:00',
          humidity: 81,
          icon: '10n',
          temp: 18,
          wind: 0.38,
        }}
      />,
    )
    .toJSON();
  expect(snap).toMatchSnapshot();
});
