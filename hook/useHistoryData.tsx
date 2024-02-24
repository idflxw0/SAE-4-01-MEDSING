// useHistoryData.js
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useHistoryData = () => {
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        const loadHistoryData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@history');
                setHistoryData(jsonValue != null ? JSON.parse(jsonValue) : []);
            } catch (e) {
                console.error('Error loading history data', e);
            }
        };

        loadHistoryData()
            .then(() => {
                console.log('History data loaded successfully.')
            })
            .catch(e => {
                console.error('Error loading  history data', e)
            });
    }, []);

    const saveHistoryData = async (newHistory) => {
        try {
            const jsonValue = JSON.stringify(newHistory);
            await AsyncStorage.setItem('@history', jsonValue);
            setHistoryData(newHistory);
        } catch (e) {
            console.error('Error saving history data', e);
        }
    };

    return { historyData, saveHistoryData };

};

export default useHistoryData;
