import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Camera, CameraType, FlashMode} from 'expo-camera';
import {Entypo} from "@expo/vector-icons";

const DataMatrixScanner = () => {
    const[hasCameraPermission, setHasCameraPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [flash, setFlash] = useState(FlashMode.off);
    const cameraRef = useRef(null);


    useEffect(()=> {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
            if (cameraStatus.status ==='granted') {
                console.log("granted")
            } else console.log('not granted');
        })();
    }, []);

    const activateFlash = () => {
        setFlash(flash === FlashMode.off ? FlashMode.torch : FlashMode.off)
        console.log(flash);
    }
    const flashColor = () => {
        return flash === 'off' ? 'gray' : '#f1f1f1';
    }

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>
    }

    return (
        <View style={styles.container}>
             <Camera
                style={styles.camera}
                type = {type}
                flashMode={flash}
                ref = {cameraRef}
             >
                <View style={styles.flashContainer}>
                    <TouchableOpacity style={styles.button} onPress={activateFlash} >
                        <Entypo name={'flash'} size={28} color={flashColor()}/>
                    </TouchableOpacity>
                </View>
             </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    camera: {
        flex : 1,
    },
    flashContainer : {
        flexDirection : 'row',
        justifyContent : 'flex-end',
    },
    button: {
        width: 40,
        height :40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 20,
    },
});

export default DataMatrixScanner;