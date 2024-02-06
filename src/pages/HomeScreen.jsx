// src/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {LinearGradient} from "expo-linear-gradient";

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(183,255,177,1)', 'transparent']}
                style={styles.background}
            />
            <Text style={styles.heading}>Welcome to MEDESING!</Text>
            <Text style={styles.description}>
                This is the home screen of your app. Add your main content here.
            </Text>
            <Button
                title="Go to Splash Screen"
                onPress={() => navigation.navigate('SplashScreen')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        width: '100%',     // Set width to the screen width
        height: '100%',   // Set height to the screen height
        position: 'absolute', // Use absolute positioning to overlay
        top: 0,
        left: 0
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff', // Set your background color
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
    },
});

export default HomeScreen;
