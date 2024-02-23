import React, {useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomInput = ({inputType}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [showEyeIcon, setShowEyeIcon] = useState(false);
    const [password, setPassword] = useState('');
    const handleInputChange = (text) => {
        setPassword(text);
        setShowEyeIcon(text.length > 0);
    };
    const handlePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };
    return (
        <View style={styles.inputContainer}>
            {!inputType.toLowerCase().includes('password')  && (
                <TextInput
                    style={styles.input}
                    placeholder={inputType}
                    placeholderTextColor="#ccc"
                    keyboardType={inputType === 'Email' ? 'email-address' : 'default'}
                    secureTextEntry={inputType === 'Password' && !isPasswordVisible}
                />
            )}
            {inputType.toLowerCase().includes('password') && (
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={[styles.input, styles.passwordInput]}
                        placeholder={inputType}
                        placeholderTextColor="#ccc"
                        onChangeText={handleInputChange}
                        secureTextEntry={!isPasswordVisible}
                    />
                    {showEyeIcon && (
                        <TouchableOpacity style={styles.eyeIcon} onPress={handlePasswordVisibility}>
                            <Icon
                                name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                                size={24}
                                color="white"
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
        backgroundColor: '#30363D', //else #222
        borderColor: '#90909F',
        borderWidth: 2,
        borderRadius: 16,
        color: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop : 12,
        marginBottom: 5,
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