import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const OnboardingScreen = ({ navigation }) => {
    const handleSignUpPress = () => {
        navigation.navigate('SignUp');
    };
    const handleLogInPress = () => {
        navigation.navigate('SignIn');
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#B7FFB1', '#FFE500']}
                style={styles.background}
            />
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={handleSignUpPress}
                >
                    <Text style={styles.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogInPress}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    footer: {
        alignItems: 'center',
    },
    signUpButton: {
        backgroundColor: '#FFB6C1', // LightPink
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginBottom: 10,
    },
    loginButton: {
        backgroundColor: '#ADD8E6', // LightBlue
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    signUpButtonText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default OnboardingScreen;
