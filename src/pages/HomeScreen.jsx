// src/HomeScreen.js
import React, { useState } from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo/vector-icons

const HomeScreen = ({ navigation }) => {
    const [cipCode, setCipCode] = useState('');

    const handleSubmit = () => {
        // Handle submission of CIP code
        console.log('Submitted CIP Code:', cipCode);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
                <Ionicons name="menu" size={40} color="black" />
            </TouchableOpacity>
            <Text style={styles.description}>Saisir le code CIP du médicament :</Text>
            <TextInput
                style={styles.input}
                placeholder="Saisir le code ici..."
                placeholderTextColor="#999999"
                onChangeText={text => setCipCode(text)}
                value={cipCode}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Soumettre</Text>
            </TouchableOpacity>
            <Image source={require('../../assets/pill right.png')} style={styles.logo1} />
            <Image source={require('../../assets/pill left.png')} style={styles.logo2} />
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
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#7C7272',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    submitButton: {
        backgroundColor: '#E02A2A',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    menuButton: {
        position: 'absolute',
        top: '3%',
        right : '3%',
        marginTop: '5%',
    },
    logo1: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    logo2: {
        position: 'absolute',
        bottom: 0,
        left: -100,
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },
});

export default HomeScreen;
