import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo/vector-icons
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient from expo/linear-gradient

const ThemeScreen = ({ navigation }) => {
    const [showFlash, setShowFlash] = useState(false);
    const [showSurprise, setShowSurprise] = useState(false);

    const handleThemeSelect = (theme) => {
        if (theme === 'Very Light') {
            // Show white flash
            setShowFlash(true);

            // Hide white flash after a short delay
            setTimeout(() => {
                setShowFlash(false);
            }, 500); // Adjust the delay as needed
        } else if (theme === 'Super Light') {
            // Show surprise effect
            setShowSurprise(true);

            // Hide surprise effect after a short delay
            setTimeout(() => {
                setShowSurprise(false);
            }, 1000); // Adjust the delay as needed
        }
        // Here you can implement saving theme logic
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#B7FFB1', '#FFE500']}
                style={styles.background}
            />
            {showFlash && (
                <Animated.View style={[styles.flash, { opacity: 1 }]} />
            )}
            {showSurprise && (
                <Animated.View style={[styles.superLight, { opacity: 1 }]} />
            )}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleThemeSelect('Light')} style={styles.option}>
                <Text style={styles.optionText}>Light Theme</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleThemeSelect('Very Light')} style={styles.option}>
                <Text style={styles.optionText}>Very Light Theme</Text>
                {showFlash && <Ionicons name="checkmark" size={16} color="black" />}
                {/* Here you can add the checkmark icon for the "Light" theme if needed */}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleThemeSelect('Super Light')} style={styles.option}>
                <Text style={styles.optionText}>Super Light Theme</Text>
                {/* Here you can add any special surprise effect for the "Super Light" theme */}
                {/* For example: */}
                {showSurprise && <Text style={styles.superLightText}>🎉 Surprise! 🎉</Text>}
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
        top: '3%',
        left: '3%',
        marginTop: '5%',
        width: 50,  // Adjust the width to make the button wider
        height: 50, // Adjust the height to make the button taller
        justifyContent: 'center',
        alignItems: 'center',
    },
    flash: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    superLight: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFACD', // LemonChiffon
        justifyContent: 'center',
        alignItems: 'center',
    },
    superLightText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700', // Gold
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

export default ThemeScreen;
