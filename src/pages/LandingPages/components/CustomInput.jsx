import React, {useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomInput = ({inputType,value, setValue, isValid,setIsValid,setErrorMessage}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showEyeIcon, setShowEyeIcon] = useState(false);
    const [password, setPassword] = useState('');
    const handleInputChange = (text) => {
        setValue(text);
        setIsValid(true);
        setErrorMessage('');
        setShowEyeIcon(text.length > 0);
    };
    const handlePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    return (
        <View style={styles.inputContainer}>
            {!inputType.toLowerCase().includes('password')  && (
                <TextInput
                    style={[styles.input, !isValid && styles.inputError]}
                    placeholder={inputType}
                    placeholderTextColor="#000"
                    keyboardType={inputType === 'Email' ? 'email-address' : 'default'}
                    secureTextEntry={inputType === 'Password' && !isPasswordVisible}
                    value={value}
                    onChangeText={handleInputChange}
                />
            )}
            {inputType.toLowerCase().includes('password') && (
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={[styles.input, styles.passwordInput, !isValid && styles.inputError]}
                        placeholder={inputType}
                        placeholderTextColor="#000"
                        secureTextEntry={!isPasswordVisible}
                        value={value}
                        onChangeText={handleInputChange}
                    />
                    {showEyeIcon && (
                        <TouchableOpacity style={styles.eyeIcon} onPress={handlePasswordVisibility}>
                            <Icon
                                name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    input: {
        backgroundColor: 'transparent', //else #222
        borderColor: '#90909F',
        borderWidth: 2,
        borderRadius: 16,
        color: '#000',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop : 12,
        marginBottom: 5,
    },
    inputError: {
        borderColor: '#FF1600', // Change this color as per your design
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    passwordInput: {
        flex: 1,

    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -10 }],
    },
});
export default CustomInput;