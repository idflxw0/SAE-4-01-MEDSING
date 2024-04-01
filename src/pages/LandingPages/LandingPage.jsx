import React, { useState, useRef, useEffect } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Animated, Easing, StatusBar, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import OnboardingItem from "./components/OnboardingItem";
import slides from "../../../slides";
import Paginator from "./components/Paginator";
// import Carousel, { Pagination } from 'react-native-snap-carousel';

const OnboardingScreen = ({ navigation }) => {
    const [index, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current; // Use useRef here for consistent reference
    const slidesRef = useRef(null);

    const viewableItemChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;


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
            <StatusBar backgroundColor="#554F59" barStyle="light-content" />
            <View style={{ flex: 3, marginBottom: '35%' }}>
                <FlatList
                    data={slides}
                    renderItem={({ item,index}) => <OnboardingItem item={item}  isFirst={index === 0}/>}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                    style={{ position: 'relative' }}
                />
            </View>

            <View style={styles.footer }>
                <Paginator data={slides} scrollX={scrollX} />
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogInPress}
                >
                    <Text style={styles.signUpButtonText}>Connexion</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={handleSignUpPress}
                >
                    <Text style={styles.buttonText}>Inscription</Text>
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
        position: 'absolute',
        bottom: '-4%',
        left: 0,
        right: 0,
        alignItems: 'center',
        padding: 20,
    },
    buttonContainer: {
        marginBottom: 10,
    },
    signUpButton: {
        backgroundColor: '#FFB6C1',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginBottom: '10%',
        width: '90%',
    },
    loginButton: {
        backgroundColor: '#ADD8E6',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30,
        width: '90%',
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
