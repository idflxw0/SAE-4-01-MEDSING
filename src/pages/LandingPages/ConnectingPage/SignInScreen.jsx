import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from expo/vector-icons
import Header from '../../../../Components/Header';
import CustomButton from "../components/CustomButton";
import {LinearGradient} from "expo-linear-gradient";

const SignInScreen = ({ navigation }) => {
    const MINIMAL_PASSWORD_LENGTH = 8;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handlePasswordForgot = () => {
        navigation.navigate('ForgotPassword');
    }

    const handleSignIn = () => {
        // Implement your sign-in logic here
        console.log('Signing in...');

        // Assuming the name of the "Home" screen is 'Home', navigate to it after successful login
        navigation.navigate('HomeScreen');
    };

    function checkMail(email) {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
    }

    function getMailChecker(isValid) {
        return isValid ? "Email is valid" : "Email isn't valid";
    }

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    function checkPassword(password) {
        if (password.length < MINIMAL_PASSWORD_LENGTH) {
            return 'Your password must contain at least 8 characters.';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Your password must contain at least one capital letter.';
        }
        if (!/[a-z]/.test(password)) {
            return 'Your password must contain at least one lower case letter.';
        }
        if (!/\d/.test(password)) {
            return 'Your password must contain at least one number.';
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            return 'Your password must contain at least one special character.';
        }
        return 'Your password is secured';
    }

    function getCheckerStyle(toCheck, dataType) {
        if (toCheck === '') {
            return {display: 'none',};
        }
        if (dataType === 'password') {
            return {
                color: checkPassword(toCheck) === 'Your password is secured' ? 'green' : 'red',
                fontSize: 16,
                fontWeight: 'bold',
            };
        } else if (dataType === 'email') {
            return {
                color: checkMail(toCheck) ? 'green' : 'red',
                fontSize: 16,
                fontWeight: 'bold',
            };
        }
    }
    /*A coder!!!*/
    const getPasswordChecker = (passwordCheckResult) => {
        switch (passwordCheckResult) {
            case 'Your password must contain at least 8 characters.':
                return 'Password is too short.';
            case 'Your password must contain at least one capital letter.':
                return 'Password needs at least one capital letter.';
            case 'Your password must contain at least one lower case letter.':
                return 'Password needs at least one lowercase letter.';
            case 'Your password must contain at least one number.':
                return 'Password needs at least one number.';
            case 'Your password must contain at least one special character.':
                return 'Password needs at least one special character.';
            case 'Your password is secured':
                return 'Password is secure. Good job!';
            default:
                return 'Invalid password';
        }
    };
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#B7FFB1', '#FFE500']}
                style={styles.background}
            />
            <Header title={"Log in"} navigation={navigation}></Header>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#000"
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
            />
            <Text style={getCheckerStyle(email, 'email')}>
                {getMailChecker(checkMail(email))}
            </Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    placeholderTextColor="#000"
                    secureTextEntry={!showPassword} // Show or hide password based on showPassword state
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={togglePasswordVisibility}
                >
                    <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="#000" />
                </TouchableOpacity>
            </View>
            <Text style={getCheckerStyle(password, 'password')}>
                {getPasswordChecker(checkPassword(password))}
            </Text>
            <CustomButton buttonText="Log in" onPress={handleSignIn} />

            <Text style={styles.orText}>Or with</Text>

            <TouchableOpacity style={styles.corporateButton} onPress={handleSignIn}>
                <Image
                    source={require('../../../../assets/LandingImages/google.png')}
                    style={styles.logoImageStyle}
                />
                <Text style={styles.buttonCorporateText}>Sign In with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.corporateButton} onPress={handleSignIn}>
                <Image
                    source={require('../../../../assets/LandingImages/meta.png')}
                    style={styles.logoImageStyle}
                />
                <Text style={styles.buttonCorporateText}>Sign In with Meta</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePasswordForgot}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity >

            <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account yet? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signInButton} >Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#30363D', // Background color grading
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    background : {
        ...StyleSheet.absoluteFillObject,
    },
    input: {
        backgroundColor: 'transparent', // Input field color grading
        borderColor: '#90909F',
        borderWidth: 2,
        borderRadius: 16,
        color: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop: 15,
        marginBottom: 15,
    },
    forgotPassword: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 20,
        color: '#000', // Forgot password text color grading
        alignSelf: 'center',
        textDecorationLine: 'underline',
        marginBottom: 20,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    signUpText: {
        fontSize: 16,
        color: '#000', // Sign up text color grading
    },
    signInButton: {
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#000', // Sign up button text color grading
    },
    orText: {
        fontWeight: 'bold',
        marginTop: 5,
        color: '#000', // Or text color grading
        alignSelf: 'center',
        marginBottom: 15,
    },
    corporateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent', // Corporate button color grading
        borderColor: '#90909F',
        borderWidth: 2,
        borderRadius: 16,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 15,
        alignSelf: 'stretch',
    },
    logoImageStyle: {
        marginLeft: 65,
        width: 31,
        height: 31,
    },
    buttonCorporateText: {
        flex: 1,
        color: '#000',
        fontSize: 16,
        marginRight: 40,
        textAlign: "center"
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    passwordInput: {
        flex: 1,
        backgroundColor: 'transparent', // Input field color grading
        borderColor: '#90909F',
        borderWidth: 2,
        borderRadius: 16,
        color: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop: 15,
        marginBottom: 15,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -13 }],
    },
});

export default SignInScreen;
