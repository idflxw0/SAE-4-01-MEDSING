// HomeScreen.test.js

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import HomeScreen from '../src/pages/HomeScreen'; // Replace with the actual path to your HomeScreen component

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('HomeScreen', () => {
    it('renders correctly', () => {
        const { getByText } = render(<HomeScreen navigation={{ navigate: jest.fn() }} />);
        expect(getByText('Saisir le code CIP du médicament :')).toBeTruthy();
    });

    // ... other tests
});
