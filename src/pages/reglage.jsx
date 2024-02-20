import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo/vector-icons
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient from expo-linear-gradient

const SettingsScreen = ({ navigation }) => {
    const handleNavigateToHome = () => {
        navigation.navigate('HomeScreen');
    };

    const handleNavigateToScreen = (screenName) => {
        navigation.navigate(screenName);
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#B7FFB1', '#FFE500']}
                style={styles.background}
            />
            <TouchableOpacity onPress={handleNavigateToHome} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.heading}>Settings</Text>
            {/* Add your settings options here */}
            <TouchableOpacity onPress={() => handleNavigateToScreen('Language')} style={styles.option}>
                <Text style={styles.optionText}>Language</Text>
                <Ionicons name="chevron-forward" size={16} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigateToScreen('Theme')} style={styles.option}>
                <Text style={styles.optionText}>Theme</Text>
                <Ionicons name="chevron-forward" size={16} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigateToScreen('Notification')} style={styles.option}>
                <Text style={styles.optionText}>Notification</Text>
                <Ionicons name="chevron-forward" size={16} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigateToScreen('About')} style={styles.option}>
                <Text style={styles.optionText}>About</Text>
                <Ionicons name="chevron-forward" size={16} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigateToScreen('Help')} style={styles.option}>
                <Text style={styles.optionText}>Help</Text>
                <Ionicons name="chevron-forward" size={16} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff', // Set your background color
    },
    background: {
        width: '100%',     // Set width to the screen width
        height: '100%',   // Set height to the screen height
        position: 'absolute', // Use absolute positioning to overlay
        top: 0,
        left: 0
    },
    backButton: {
        position: 'absolute',
        top: '5%',
        left: '5%',
        marginTop: '10%',
        width: 50,  // Adjust the width to make the button wider
        height: 50, // Adjust the height to make the button taller
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,

    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        height: 40,
        borderColor: '#7C7272',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    optionText: {
        flex: 1,
    },
});

export default SettingsScreen;
