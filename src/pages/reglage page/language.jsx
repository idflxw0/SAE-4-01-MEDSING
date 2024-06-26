import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo/vector-icons
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient from expo-linear-gradient

const LanguageScreen = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('English');

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        // Here you can implement logic to save the selected language
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#B7FFB1', '#FFE500']}
                style={styles.background}
            />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.heading}>Language</Text>
            <TouchableOpacity onPress={() => handleLanguageSelect('English')} style={styles.option}>
                <Text style={styles.optionText}>English</Text>
                {selectedLanguage === 'English' && <Ionicons name="checkmark" size={16} color="black" />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageSelect('French')} style={styles.option}>
                <Text style={styles.optionText}>French</Text>
                {selectedLanguage === 'French' && <Ionicons name="checkmark" size={16} color="black" />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageSelect('Spanish')} style={styles.option}>
                <Text style={styles.optionText}>Spanish</Text>
                {selectedLanguage === 'Spanish' && <Ionicons name="checkmark" size={16} color="black" />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageSelect('German')} style={styles.option}>
                <Text style={styles.optionText}>German</Text>
                {selectedLanguage === 'German' && <Ionicons name="checkmark" size={16} color="black" />}
            </TouchableOpacity>
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
        top: '3%',
        left: '3%',
        marginTop: '5%',
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
});

export default LanguageScreen;
