import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import Header from '../../../../Components/Header';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import {LinearGradient} from "expo-linear-gradient";
const SignUpScreen = ({ navigation }) => {
    const [isChecked, setIsChecked] = useState(false);
    const toggleCheckbox = () => {
        setIsChecked((prev) => !prev);
    };
    const handleSignUp = () => {
        // Implement your sign-in logic here
        console.log('Signing Up...');

        // Assuming the name of the "Home" screen is 'Home', navigate to it after successful login
        navigation.navigate('HomeScreen');
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#B7FFB1', '#FFE500']}
                style={styles.background}
            />
            <Header title={"Sign up"} navigation={navigation}></Header>
            <CustomInput inputType={"Name"}></CustomInput>
            <CustomInput inputType={"Email"}></CustomInput>
            <CustomInput inputType={"Password"}></CustomInput>
            <View style={styles.termsContainer}>
                <TouchableOpacity style={styles.checkbox} onPress={toggleCheckbox}>
                    {isChecked && <FontAwesome name="check" size={18} color="black" style={styles.checkIcon}/>}
                </TouchableOpacity>
                <Text style={styles.termsText}>
                    By signing up, you agree to the{' '}
                    <Text style={styles.linkText}>
                        Terms of Service and Privacy Policy
                    </Text>
                </Text>
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
        marginBottom: 20,
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
