import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Animated, Easing } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

const ConfirmationPage = ({navigation}) => {
    const logo1TranslateY = new Animated.Value(-500);
    const logo2TranslateY = new Animated.Value(-500);
    const logo1TranslateX = new Animated.Value(100);
    const logo2TranslateX = new Animated.Value(-100);
    const logo1Rotate = new Animated.Value(0);
    const logo2Rotate = new Animated.Value(0);

    const startAnimation = () => {
        Animated.parallel([

            Animated.sequence([
                Animated.timing(logo1TranslateY, {
                    toValue: 0,
                    duration: 800,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true,
                }),
                Animated.timing(logo1TranslateX, {
                    toValue: 0,
                    duration: 800,
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
                    duration: 800,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true,
                }),
                Animated.timing(logo2TranslateX, {
                    toValue: 0,
                    duration: 800,
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


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#B7FFB1', '#FFE500']}
                style={styles.background}
            />
            <Text style={styles.heading}>
                Votre demande a bien été prise en compte !
            </Text>

            <Text style={styles.message}>
                Nous vous tenons informé de la situation au plus vite.
            </Text>

            <View style={styles.buttonContainer}>
                <Button
                    title="Retour"
                    color="#E02A2A"
                    onPress={() => navigation.goBack()}
                />
            </View>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    },
    heading : {
        fontSize: 35,
        textAlign: 'center',
        paddingHorizontal: 50,
        paddingVertical: 12,
        top : '-20%',
    },
    message: {
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 20,
        marginHorizontal: 20,
        color : '#655E5E',
        top : '-5%'
    },
    buttonContainer: {
        backgroundColor: 'red',
        borderRadius: 42,
        overflow: 'hidden',
        width : 100,
        borderStyle: 'solid',
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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

export default ConfirmationPage;