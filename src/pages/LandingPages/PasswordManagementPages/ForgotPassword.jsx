import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity,Alert} from "react-native";
import Header from '../../../../Components/Header';
import {LinearGradient} from "expo-linear-gradient";
import {auth} from "../../../config/firebase";
import {sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    const handleContinue = () => {
        sendPasswordResetEmail(auth,email).then(() => {
            navigation.navigate('ResetConfirmation', { email: email });
        })
            .catch((error) => {
                Alert.alert('Error', error);
            })
    }
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#B7FFB1', '#FFE500']}
                style={styles.background}
            />
            <Header title={"Mot de passe oublié"} navigation={navigation}></Header>
            <View>
                <Text style={styles.text}>
                    Ne vous inquiétez pas.
                </Text>
                <Text style = {styles.text}>
                    Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#000"
                    keyboardType="email-address"
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <TouchableOpacity
                style={styles.ContinueButton}
                onPress={handleContinue}
            >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#30363D',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    background : {
        ...StyleSheet.absoluteFillObject,
    },
    text : {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 24,
        //marginBottom: 30,
    },
    input: {
        backgroundColor: 'transparent', //else #222
        borderColor: '#90909F',
        borderWidth: 2,
        borderRadius: 16,
        color: '#000',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop : 15,
        marginBottom: 15,
    },
    ContinueButton: {
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        borderColor: 'black',
        borderWidth: 2,
        padding: 15,
        paddingVertical: 19,
        borderRadius: 16,
        marginTop : 15,
        marginBottom: 15,
    },
    buttonText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },

});
export default ForgotPassword;