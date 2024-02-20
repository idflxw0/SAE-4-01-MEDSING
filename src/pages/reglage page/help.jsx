import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HelpScreen = () => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#B7FFB1', '#FFE500']}
                style={styles.background}
            />
            <Text style={styles.heading}>Help</Text>
            <Text style={styles.content}>This is the Help page. Add your help content here.</Text>
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
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    content: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default HelpScreen;
