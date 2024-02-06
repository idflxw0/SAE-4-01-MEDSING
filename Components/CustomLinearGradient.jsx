import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
const CustomLinearGradient = () => {
    return(
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(183,255,177,1)', 'transparent']}
                style={styles.background}
            />
            <LinearGradient
                // Button Linear Gradient
                colors={['#4c639f', '#525998', '#192f6a']}
                style={styles.button}>
                <Text style={styles.buttonText}>Sign in with Facebook</Text>
            </LinearGradient>
        </View>
    );
}

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
        // backgroundColor: '#B7FFB1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});
export default CustomLinearGradient;
