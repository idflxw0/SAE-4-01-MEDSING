import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";

const ConfirmationPage = () => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#B7FFB1', '#FFE500']}
                style={styles.background}
            />
            <Text style={styles.heading}>
                Votre demande a bien été prise en compte !
            </Text>
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
        width: '100%',     // Set width to the screen width
        height: '100%',   // Set height to the screen height
        position: 'absolute', // Use absolute positioning to overlay
        top: 0,
        left: 0
    },
    heading : {
        fontSize: 35,
        textAlign: 'center',
        paddingHorizontal: 50, // Adjust this for horizontal padding if needed
        paddingVertical: 12, // Reduced from 12 for less vertical padding
        top : '-20%',
    },

});

export default ConfirmationPage;