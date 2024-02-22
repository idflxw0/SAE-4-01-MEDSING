import React, { useState } from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { Ionicons,FontAwesome } from '@expo/vector-icons'; // Import Ionicons from expo/vector-icons
import {LinearGradient} from "expo-linear-gradient";
import DataMatrixScanner from "../../Components/DataMatrixScanner";

const HomeScreen = ({ navigation }) => {
    const [data, setData] = useState('');
    const [cipCode, setCipCode] = useState('');
    const [productName, setProductName] = useState('');
    const [history, setHistory] = useState([]);
    const handleSubmit = () => {
        const newEntry = {
            date: new Date().toLocaleDateString(),
            cipCode: cipCode,
            name: productName,
        };

        // Add the new entry to the existing history
        setHistory(prevHistory => [...prevHistory, newEntry]);
    };
    const handleNavigateToSettings = () => {
        navigation.navigate('Settings');
    };
    const navigateHistory = () => {
        navigation.navigate('History',{ history: history });
    }
    const handleCipCodeScanned = (data) => {
        setData(data);
        setActualProduct();
        console.log('actual cip code : ' + cipCode);
        console.log('actual product name : '  + productName)
    };

    const setActualProduct = () => {
        if (data !== '') {
            const datas  = data.split(';');
            setCipCode(datas[0]);
            setProductName(datas[1]);
        }
    }
    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['#B7FFB1', '#FFE500']}
                style={styles.background}
            />
            {/*<TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
                <Ionicons name="menu" size={40} color="black" />
            </TouchableOpacity>*/}
            <TouchableOpacity onPress={handleNavigateToSettings} style={styles.menuButton}>
                <Ionicons name="menu" size={40} color="black" />
            </TouchableOpacity>
            <Text style={styles.description}>Saisir le code CIP du médicament :</Text>
            <TextInput
                style={styles.input}
                placeholder="Saisir le code ici..."
                placeholderTextColor="#999999"
                onChangeText={text => {
                    const filteredText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                    setCipCode(filteredText); // Update state with filtered text
                }}
                value={cipCode}
            />
            <TouchableOpacity onPress={navigateHistory}>
                <FontAwesome name="history" size={24} color="black" style={styles.history} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButtonWrapper}>
                <LinearGradient
                    colors={['#E02A2A','rgba(224, 42, 42, 1)']}
                    style={styles.submitButton}
                >
                    <Text style={styles.submitButtonText}>SIGNALER</Text>
                </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.ScannerIndicator}> Flasher le code DataMatrix :</Text>
            <View style={styles.ScannerContainer}>
                <DataMatrixScanner onCipCodeScanned={handleCipCodeScanned}/>
            </View>
            <Image source={require('../../assets/pill right.png')} style={styles.logo1} />
            <Image source={require('../../assets/pill left.png')} style={styles.logo2} />
        </View>
    );
};

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
        color: '#000000',
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
    submitButtonWrapper: {
        borderRadius: 42, // Keep the border radius here to maintain the shape
        marginBottom: 20, // And any other layout-related styles
        overflow: 'hidden', // Ensures the LinearGradient respects the border radius
    },
    submitButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 42, // This will now shape the LinearGradient
        width: '100%', // Ensure it fills the wrapper
        alignItems: 'center', // Center the text horizontally
        justifyContent: 'center', // Center the text vertically
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
    ScannerIndicator : {
        width : '50%',
        textAlign: 'center',
        fontSize : 20,
        paddingBottom : 20

    },
    ScannerContainer : {
        width : '60%',
        height : '25%',
        borderRadius : 20,
        overflow :'hidden',
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
    history: {
       marginLeft : '50%',
       top: '130%',
    }
});

export default HomeScreen;
