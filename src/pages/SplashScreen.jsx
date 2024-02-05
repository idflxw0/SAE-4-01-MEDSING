// src/SplashScreen.js
import React, { useEffect } from 'react';
import {Text, Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        // Simulate a delay, for example, 2000ms (2 seconds)
        const splashTimeout = setTimeout(() => {
            // Navigate to the next screen (replace 'HomeScreen' with your desired screen name)
            navigation.replace('HomeScreen');
        }, 2000);

        // Clear the timeout when the component unmounts
        return () => clearTimeout(splashTimeout);
    }, [navigation]);

    return (
        /*<LinearGradient
            colors={['#B7FFB1', '#FFE500']}
            style={styles.container}
        >
            <Image source={require('../../assets/MEDSING.png')} style={styles.logo} />
            <Text style={styles.appName}>MEDESING</Text>
        </LinearGradient>*/
        <View style={styles.container}>
                <Image source={require('../../assets/MEDSING.png')} style={styles.logo} />
                <Text style={styles.appName}>MEDESING</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    appName: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default SplashScreen;
