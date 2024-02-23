import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";

const CustomButton = ({buttonText,onPress}) => {
    return (
        <TouchableOpacity style={styles.ButtonContainer} onPress={onPress}>
            <Text style={styles.ButtonText}>{buttonText}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    ButtonContainer: {
        alignSelf: 'stretch',
        backgroundColor: '#EBFE69',
        padding: 15,
        paddingVertical: 19,
        borderRadius: 16,
        marginTop : 15,
        marginBottom: 15,
    },

    ButtonText: {
        color: '#554F59',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
export default CustomButton;