import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity} from "react-native";
import Header from '../components/Header';

const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    const handleContinue = () => {
        navigation.navigate('ResetConfirmation', { email: email });
    }
    return (
        <View style={styles.container}>
            <Header title={"Forgot password"} navigation={navigation}></Header>
            <View>
                <Text style={styles.text}>
                    Don't worry.
                </Text>
                <Text style = {styles.text}>
                    Enter your email and we'll send you a link to reset your password.
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#ccc"
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
    text : {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
        //marginBottom: 30,
    },
    input: {
        backgroundColor: '#30363D', //else #222
        borderColor: '#90909F',
        borderWidth: 2,
        borderRadius: 16,
        color: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop : 15,
        marginBottom: 15,
    },
    ContinueButton: {
        alignSelf: 'stretch',
        backgroundColor: '#EBFE69',
        padding: 15,
        paddingVertical: 19,
        borderRadius: 16,
        marginTop : 15,
        marginBottom: 15,
    },
    buttonText: {
        color: '#554F59',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },

});
export default ForgotPassword;