import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import Header from '../../../../Components/Header';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import {LinearGradient} from "expo-linear-gradient";
import {auth, createUser, db} from '../../../config/firebase';

import {storeUserSession} from "../../../../hook/authSession";
import {log} from "expo/build/devtools/logger";
import {doc, setDoc} from "firebase/firestore";

const SignUpScreen = ({ navigation }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const MINIMAL_PASSWORD_LENGTH = 6;

    const [nameValid, setNameValid] = useState(true);
    const[emailValid, setEmailValid] = useState(true);
    const[passwordValid, setPasswordValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const toggleCheckbox = () => {
        setIsChecked((prev) => !prev);
    };

    const checkMail = (email) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(email);
    };
    function getMailChecker(isValid) {
        return isValid ? "Email is valid" : "Email isn't valid";
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

    const getPasswordChecker = (passwordCheckResult) => {
        switch (passwordCheckResult) {
            case 'Your password must contain at least 8 characters.':
                return 'Le mot de passe est trop court.';
            case 'Your password must contain at least one capital letter.':
                return 'Le mot de passe nécessite au moins une lettre majuscule.';
            case 'Your password must contain at least one lower case letter.':
                return 'Le mot de passe nécessite au moins une lettre minuscule.';
            case 'Your password must contain at least one number.':
                return 'Password needs at least one number.';
            case 'Your password must contain at least one special character.':
                return 'Le mot de passe nécessite au moins un chiffre.';
            case 'Your password is secured':
                return 'Le mot de passe est sécurisé. Bon travail!';
            default:
                return 'Mot de passe incorrect';
        }
    };

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

    const pushToFireStore = async (data, user) => {
        const userDocRef = doc(db, "users", user.uid); // 'users' is the collection
        try {
            await setDoc(userDocRef, data, { merge: true }); // 'merge: true' will update the document if it exists or create it if it does not
            console.log('User data has been saved');
        } catch (error) {
            console.error("Error saving user data to Firestore:", error);
        }
    };

    const handleSignUp = () => {
        let isValid = true;
        if (!name.trim()) {
            setNameValid(false);
            isValid =false;
        }
        if (!email.trim() || !checkMail(email)) {
            setEmailValid(false);
            isValid =false;
        }
        if (!password.trim) {
            setPasswordValid(false);
            isValid = false;
        }
        if (isValid) {
            createAuthUser();
        }
        else {
            setErrorMessage('Veuillez remplir tous les champs requis.')
        }
    };

    const createAuthUser = () => {
        createUser(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                pushToFireStore({name: name},user).then(()=> {
                    navigation.navigate('HomeScreen');
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error signing up:', error);
                setErrorMessage(errorMessage);
            });
    }
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#B7FFB1', '#FFE500']}
                style={styles.background}
            />
            <Header title={"Sign up"} navigation={navigation}></Header>

            <CustomInput inputType={"Name"} value={name} setValue={setName} isValid={nameValid} setIsValid={setNameValid} setErrorMessage={setErrorMessage} />
            <CustomInput inputType={"Email"} value={email} setValue={setEmail} isValid={emailValid} setIsValid={setEmailValid} setErrorMessage={setErrorMessage} />
            <Text style={getCheckerStyle(email, 'email')}>
                {getMailChecker(checkMail(email))}
            </Text>
            <CustomInput inputType={"Password"} value={password} setValue={setPassword} isValid={passwordValid} setIsValid={setPasswordValid} setErrorMessage={setErrorMessage} />
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <Text style={getCheckerStyle(password, 'password')}>
                {getPasswordChecker(checkPassword(password))}
            </Text>
            <View style={styles.termsContainer}>
                <TouchableOpacity style={styles.checkbox} onPress={toggleCheckbox}>
                    {isChecked && <FontAwesome name="check" size={18} color="black" />}
                </TouchableOpacity>
                <Text style={styles.termsText}>
                    By signing up, you agree to the{' '}
                </Text>
                <TouchableOpacity onPress={() => { navigation.navigate('Terms') }}>
                    <Text style={styles.linkText}>Terms of Service and</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Terms') }}>
                    <Text style={styles.linkText}>Privacy Policy</Text>
                </TouchableOpacity>
            </View>
            <CustomButton buttonText="Sign up" onPress={handleSignUp}></CustomButton>

            <Text style={styles.orText}>Or with</Text>

            <TouchableOpacity style={styles.CorporateButton} onPress={handleSignUp}>
                <Image
                    source={require('../../../../assets/LandingImages/google.png')}
                    style={styles.LogoImageStyle}
                />
                <Text style={styles.buttonCorporateText}>Sign Up with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.CorporateButton} onPress={handleSignUp}>
                <Image
                    source={require('../../../../assets/LandingImages/meta.png')}
                    style={styles.LogoImageStyle}
                />
                <Text style={styles.buttonCorporateText}>Sign Up with Meta</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.loginButton} >Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    linkText: {
        color: '#000',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    background : {
        ...StyleSheet.absoluteFillObject,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap', // Allow wrapping only if necessary
        marginBottom: 20,
        marginRight: -10, // Negate the padding of the checkbox
    },
    checkbox: {
        width: 24,
        height: 24,
        backgroundColor: 'transparent',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 3,
        marginRight: 10,
    },
    checkIcon: {
        paddingTop : 2,
        textAlign: 'center',
    },
    CorporateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderColor: '#90909F',
        borderWidth: 2,
        borderRadius: 16,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 15,
        alignSelf: 'stretch',
    },
    errorMessage: {
        color: '#FF1600',
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'flex-start',
    },
    LogoImageStyle : {
      marginLeft : 65,
      width : 31,
      height: 31,
    },
    MetaImageStyle : {
        marginRight : 20,
        width : 60,
        height: 30,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,

    },
    buttonCorporateText : {
        flex: 1,
        color: '#000',
        fontSize: 16,
        marginRight : 40,
        textAlign : "center"
    },
    orText: {
        fontWeight: 'bold',
        marginTop: 5,
        color: '#000',
        alignSelf: 'center',
        marginBottom: 15,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    loginText: {
        color: '#000',
    },
    loginButton: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#000',
    },
    termsText: {
        color: '#000',
        fontSize: 14,
        flexShrink: 1,
    },
    socialIcon: {
        marginRight: 10,
    },
});
export default SignUpScreen;
