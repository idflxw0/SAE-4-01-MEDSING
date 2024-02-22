import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Alert} from 'react-native';
import { CameraView, useCameraPermissions} from 'expo-camera/next';
import { Entypo } from '@expo/vector-icons';

const DataMatrixScanner = () => {
    const [cameraActive, setCameraActive] = useState(false);
    const [enableTorch, setTorch] = useState(false);
    const cameraRef = useRef(null);
    const [permission, requestPermission] = useCameraPermissions();
    const timerRef = useRef(null);
    const lastTapRef = useRef(null); // Ref to store the last tap timestamp
    const [scanned, setScan] = useState(false);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current); // Clear the timer when the component unmounts
            }
        };
    }, []);

    const handlePressCamera = async () => {
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 500;

        if (lastTapRef.current && (now - lastTapRef.current) < DOUBLE_TAP_DELAY) {
            setCameraActive(false); // Deactivate camera on double tap
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            lastTapRef.current = null;
        } else {
            // First tap or taps not within the double tap delay
            lastTapRef.current = now;
            if (!cameraActive) {
                // Request permission and activate camera if it's not already active
                if (!permission?.granted) {
                    const { status } = await requestPermission();
                    if (status === 'granted') {
                        activateCamera();
                    } else {
                        alert('Sorry, we need camera permissions to make this work!');
                    }
                } else {
                    activateCamera();
                }
            }
        }
    };

    const activateCamera = () => {
        setCameraActive(true);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            setCameraActive(false);
            Alert.alert("Time's up", "No DataMatrix code detected in 2 minutes. Camera deactivated.");
        }, 120000); // 2 minutes
    };

    const activateFlash = () => {
        setTorch((prevTorch) => !prevTorch);
    };

    const handleBarCodeScanned = ({ type, data }) => {
        if (!scanned) {
            // Using Alert.alert to show the barcode data and to avoid spamming, we wait for the user to press "OK"
            Alert.alert(
                "Scan successful!",
                `Bar code with type ${type} and data ${data} has been scanned!`,
                [
                    {
                        text: "OK",
                        onPress: () => {
                            setScan(false); // Resetting scan state to allow for new scans
                            if (timerRef.current) {
                                clearTimeout(timerRef.current);
                                activateCamera(); // Reactivate camera for next scan
                            }
                        }
                    }
                ],
                { cancelable: false } // This forces the user to tap "OK" and not dismiss the alert by tapping outside of it
            );
            setScan(true); // Setting scanned state to true to prevent re-scanning until the alert is dismissed
        }
    };

    if (!permission) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.camera} onPress={handlePressCamera} activeOpacity={1}>
                {cameraActive ? (
                    <CameraView
                        mode={'picture'}
                        style={StyleSheet.absoluteFill}
                        ref={cameraRef}
                        enableTorch={enableTorch}
                        barcodeScannerSettings={{
                            barcodeTypes: ['datamatrix']
                        }}
                        onBarcodeScanned={handleBarCodeScanned}
                    >
                        <View style={styles.flashContainer}>
                            <TouchableOpacity style={styles.button} onPress={activateFlash} activeOpacity={1}>
                                <Entypo name={'flash'} size={28} color={!enableTorch ? 'gray' : '#f1f1f1'} />
                            </TouchableOpacity>
                        </View>
                    </CameraView>
                ) : (
                    <Text style={styles.inactiveText}>Tap to activate camera</Text>
                )}
            </TouchableOpacity>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    flashContainer: {
        position: 'absolute',
        top: -20,
        right: -20,
        padding: 20,
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
    inactiveText: {
        fontSize: 18,
        color: 'grey',
        textAlign: 'center',
    },
});

export default DataMatrixScanner;
