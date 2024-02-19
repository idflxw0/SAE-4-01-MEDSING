import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions, FlashMode } from 'expo-camera/next';
import { Entypo } from '@expo/vector-icons';

const DataMatrixScanner = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [enableTorch, setTorch] = useState(false);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await requestPermission();
            if (status !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!');
            }
        })();
    }, []);

    const activateFlash = () => {
        setTorch((prevTorch) => !prevTorch);
    };

    if (!permission || permission.status !== 'granted') {
        return <Text style={styles.refused}>No access to camera</Text>;
    }

    const handleBarCodeScanned = ({ type, data }) => {
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };


    return (
        <View style={styles.container}>
            <CameraView
                mode={'picture'}
                style={styles.camera}
                ref={cameraRef}
                enableTorch={enableTorch}
                barcodeScannerSettings={{
                    barcodeTypes: ['datamatrix']
                }}
                onBarcodeScanned={handleBarCodeScanned}
            >
                <View style={styles.flashContainer}>
                    <TouchableOpacity style={styles.button} onPress={activateFlash}>
                        <Entypo name={'flash'} size={28} color={!enableTorch ? 'gray' : '#f1f1f1'} />
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    camera: {
        flex: 1,
    },
    flashContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        width: 40,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 20,
    },
    refused: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
});

export default DataMatrixScanner;
