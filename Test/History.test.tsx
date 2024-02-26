import React from 'react';
import { render } from '@testing-library/react-native';
import History from '../src/pages/History';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('History', () => {
    it('renders correctly', () => {
        // Mock the useHistoryData hook before using it
        const historyData = [
            { date: '01/01/2022', cipCode: '1234567890123', name: 'Product A' },
            // ... more test data
        ];

        const { getByText } = render(<History navigation={{ navigate: jest.fn() }} route={{ params: { history: historyData } }} />);
        expect(getByText('Histoire')).toBeTruthy();
        // Verify that the history data is rendered
        expect(getByText('1234567890123')).toBeTruthy();
    });

    // ... other tests
});