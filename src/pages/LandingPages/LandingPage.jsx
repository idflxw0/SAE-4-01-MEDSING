import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const OnboardingScreen = ({ navigation }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);
    const buttonScale = useRef(new Animated.Value(1)).current;

    const handleSignUpPress = () => {
        animateButton();
        navigation.navigate('SignUp');
    };

    const handleLogInPress = () => {
        animateButton();
        navigation.navigate('SignIn');
    };

    const animateButton = () => {
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.9,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(buttonScale, {
                toValue: 1,
                duration: 50,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const carouselItems = [
        { title: 'Bienvenue sur MedSing !'},
        { title: 'Signaler des médicaments', paragraph: 'Saissisez le code CIP du médicament à signaler qui susciste des difficultés de renouvellement ' },
        { title: 'Observer votre historique', paragraph: 'Vous pouvez suivre tous vos signalements depuis la page Historique' },
        { title: 'Scanner vos médicaments', paragraph: 'Utilisez votre caméra pour signaler vos médicaments à l’aide du DataMatrix, plutôt que de saisir le code CIP' },
    ];

    const renderCarouselItem = ({ item, index }) => {
        return (
            <View style={styles.carouselItem}>
                <Text style={styles.carouselTitle}>{item.title}</Text>
                <Text style={styles.carouselParagraph}>{item.paragraph}</Text>
            </View>
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current) {
                carouselRef.current.snapToNext();
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#B7FFB1', '#FFE500']}
                style={styles.background}
            />
            <View style={styles.carouselContainer}>
                <Carousel
                    ref={carouselRef}
                    data={carouselItems}
                    renderItem={renderCarouselItem}
                    sliderWidth={300}
                    itemWidth={300}
                    layout={'default'}
                    loop={true}
                    onSnapToItem={(index) => setActiveIndex(index)}
                />
            </View>
            <Pagination
                dotsLength={carouselItems.length}
                activeDotIndex={activeIndex}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.paginationDot}
                inactiveDotStyle={styles.inactivePaginationDot}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
            <View style={styles.footer}>
                <Animated.View style={[styles.buttonContainer, { transform: [{ scale: buttonScale }] }]}>
                    <TouchableOpacity
                        style={styles.signUpButton}
                        onPress={handleSignUpPress}
                    >
                        <Text style={styles.signUpButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.buttonContainer, { transform: [{ scale: buttonScale }] }]}>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogInPress}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </Animated.View>
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
    carouselContainer: {
        marginTop: 700,
        marginBottom: 20,
    },
    carouselItem: {
        borderRadius: 5,
        padding: 20,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    carouselTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    carouselParagraph: {
        fontSize: 16,
        color: '#888',
    },
    footer: {
        alignItems: 'center',
        marginBottom: 400,
    },
    buttonContainer: {
        marginBottom: 10,
    },
    signUpButton: {
        backgroundColor: '#FFB6C1',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: '#ADD8E6',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30,
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
    paginationContainer: {
        paddingTop: 8,
        paddingBottom: 106,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.92)',
    },
    inactivePaginationDot: {
        backgroundColor: 'rgba(0, 0, 0, 0.32)',
    },
});

export default OnboardingScreen;
