import React, {useEffect, useState} from 'react';
import {View, Text, Button, TextInput, TouchableOpacity, StyleSheet, Image, Alert} from 'react-native';
import { Ionicons,FontAwesome } from '@expo/vector-icons';
import {LinearGradient} from "expo-linear-gradient";
import DataMatrixScanner from "../../Components/DataMatrixScanner";

import productList from "../../data/data.json";

import {auth, db} from "../config/firebase";
import {doc, getDoc, setDoc,updateDoc} from "firebase/firestore";
import {checkUserSession} from "../../hook/authSession";

const HomeScreen = ({ navigation }) => {
    const [cipCode, setCipCode] = useState('');
    const [productName, setProductName] = useState('');
    const [history, setHistory] = useState([]);
    const [ValidProduct, setValidProduct] = useState(false);
    const [isUserChecked, setIsUserChecked] = useState(false);
    const handleNavigateToSettings = () => {
        navigation.navigate('Settings');
    };
    const navigateHistory = () => {
        navigation.navigate('History',{ history: history });
    }
    const handleSubmit = async () => {
        if (!ValidProduct) {
            Alert.alert('Invalid Product', 'The product code entered is not valid.');
            return;
        }
        await checkUserSession();
        const user = auth.currentUser;
        if (!user) {
            Alert.alert('Error', 'No authenticated user found.');
            return;
        }
        const newEntry = {
            date: new Date().toLocaleDateString(),
            cipCode: cipCode,
            name: productName,
        };
        const userDocRef = doc(db, "userData", user.uid);
        try {
            // Get the current document
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                const existingHistory = docSnap.data().history || [];
                await updateDoc(userDocRef, {
                    history: [...existingHistory, newEntry]
                });
            } else {
                await setDoc(userDocRef, { history: [newEntry] });
            }
            console.log('Product data has been saved');
            setCipCode('');
            setProductName('');
            navigation.navigate('ConfirmationPage');
        } catch (error) {
            console.error("Error saving product data:", error);
            Alert.alert('Error', 'Failed to save product data.');
        }
    };
    const handleCipCode = (data) => {
        const product = productList.find(p => String(p.CIP) === String(data));
        if (!product) {
            setValidProduct(false);
            Alert.alert('Invalid CIP', 'The CIP code entered is not valid.');
            return;
        }
        setCipCode(data);
        setProductName(product.Name);
        setValidProduct(true);
    };

    const onHandleSubmitPress = () => {
        handleCipCode(cipCode);
        if (ValidProduct) {
            handleSubmit()
                .then(()=> {
                    console.log('product has been reported')})
                .catch(()=>{
                    console.log('Error during submitting report')});
        } else {
            Alert.alert('Invalid CIP', 'The CIP code entered is not valid.');
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
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
                    setCipCode(filteredText);
                }}
                value={cipCode}
                maxLength={13}
            />
            <TouchableOpacity onPress={navigateHistory}>
                <FontAwesome name="history" size={24} color="black" style={styles.history} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onHandleSubmitPress} style={[styles.submitButtonWrapper, cipCode ? {} : styles.buttonDisabled]}>
                <LinearGradient
                    colors={['#E02A2A','rgba(224, 42, 42, 1)']}
                    style={styles.submitButton}
                >
                    <Text style={styles.submitButtonText}>SIGNALER</Text>
                </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.ScannerIndicator}> Flasher le code DataMatrix :</Text>
            <View style={styles.ScannerContainer}>
                <DataMatrixScanner onCipCodeScanned={handleCipCode}/>
            </View>
            <Image source={require('../../assets/pill right 2.png')} style={styles.logo2} />
            <Image source={require('../../assets/pill left 2.png')} style={styles.logo1} />
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
        borderRadius: 42,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDisabled: {
        opacity: 0.5,
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
        bottom: -30,
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
