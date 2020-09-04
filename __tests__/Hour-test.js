import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Hour from '../components/Hour';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
test('renders correctly', () => {
  const snap = renderer
    .create(
      <Hour
        weather={{
          dayNumber: 6,
          description: 'clear sky',
          hour: '06:00',
          humidity: 88,
          icon: '03d',
          temp: 17,
          wind: 2.93,
        }}
        style={[
          {
            alignItems: 'center',
            borderColor: '#fff',
            borderRightWidth: 1,
            flex: 1,
            justifyContent: 'center',
          },
          { borderRightWidth: 0 },
        ]}
      />,
    )
    .toJSON();
  expect(snap).toMatchSnapshot();
});
