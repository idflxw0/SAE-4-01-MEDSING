import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated, Easing} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo/vector-icons
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient from expo-linear-gradient
import { auth,signOutUser } from '../config/firebase';
import {clearUserSession} from "../../hook/authSession";
const SettingsScreen = ({ navigation}) => {
    const logo1TranslateY = new Animated.Value(-500);
    const logo2TranslateY = new Animated.Value(-500);
    const logo1TranslateX = new Animated.Value(100);
    const logo2TranslateX = new Animated.Value(-100);
    const logo1Rotate = new Animated.Value(0);
    const logo2Rotate = new Animated.Value(0);
    const user = auth.currentUser.email;
    const handleSignOut = async () => {
        try {
            await clearUserSession();
            await signOutUser(auth);
            console.log('User signed out');
            navigation.navigate('Landing');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const startAnimation = () => {
        Animated.parallel([
            Animated.sequence([
                Animated.timing(logo1TranslateY, {
                    toValue: 0,
                    duration: 600,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true,
                }),
                Animated.timing(logo1TranslateX, {
                    toValue: 0,
                    duration: 600,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true,
                }),
                Animated.timing(logo1Rotate, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true,
                }),

            ]),

            Animated.sequence([
                Animated.timing(logo2TranslateY, {
                    toValue: 0,
                    duration: 600,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true,
                }),
                Animated.timing(logo2TranslateX, {
                    toValue: 0,
                    duration: 600,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true,
                }),
                Animated.timing(logo2Rotate, {
                    toValue: 1,
                    duration: 1200,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true,
                }),

            ]),
        ]).start();
    };

    useEffect(() => {
        startAnimation();
    }, []);
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
            <TouchableOpacity onPress={() => handleNavigateToScreen('ModifyProfile')} style={styles.option}>
                <Text style={styles.optionText}>Modifier votre profile</Text>
                <Ionicons name="chevron-forward" size={16} color="black" />
            </TouchableOpacity>
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

            {user === process.env.EXPO_PUBLIC_ADMIN && (
                <TouchableOpacity onPress={() => handleNavigateToScreen('Admin')} style={styles.option}>
                    <Text style={styles.optionText}>Admin</Text>
                    <Ionicons name="chevron-forward" size={16} color="black" />
                </TouchableOpacity>
                )
            }
            <TouchableOpacity onPress={() => handleSignOut()} style={styles.option}>
                <Text style={styles.optionText}>Log out</Text>
                <Ionicons name="chevron-forward" size={16} color="black" />
            </TouchableOpacity>
            <Animated.Image
                source={require('../../assets/pill right 2.png')}
                style={{
                    ...styles.logo1,
                    transform: [
                        { translateY: logo1TranslateY },
                        { translateX: logo1TranslateX },
                        { rotate: logo1Rotate.interpolate({
                                inputRange: [0, 2],
                                outputRange: ['0deg', '360deg']
                            }) }
                    ]
                }}
            />
            <Animated.Image
                source={require('../../assets/pill left 2.png')}
                style={{
                    ...styles.logo2,
                    transform: [
                        { translateY: logo2TranslateY },
                        { translateX: logo2TranslateX },
                        { rotate: logo2Rotate.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg']
                            }) }
                    ]
                }}
            />
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
    logo1: {
        position: 'absolute',
        bottom: -30,
        left: 120,
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },
    logo2: {
        position: 'absolute',
        bottom: -30,
        right:120,
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
});

export default SettingsScreen;
