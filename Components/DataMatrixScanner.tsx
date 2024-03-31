import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Alert} from 'react-native';
import { CameraView, useCameraPermissions} from 'expo-camera/next';
import { Entypo } from '@expo/vector-icons';
import productList from '../data/data.json';


// @ts-ignore
const DataMatrixScanner = ({onCipCodeScanned}) => {
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
            setCameraActive(false); // double tap to deactivate
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            lastTapRef.current = null;
        } else {
            // @ts-ignore
            lastTapRef.current = now;
            if (!cameraActive) {
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
        // @ts-ignore
        timerRef.current = setTimeout(() => {
            setCameraActive(false);
            Alert.alert("Time's up", "No DataMatrix code detected in 2 minutes. Camera deactivated.");
        }, 120000); // 2 minutes
    };

    const activateFlash = () => {
        setTorch((prevTorch) => !prevTorch);
    };

    const extractCIPCode = (scannedData: string) => {
        return scannedData.substring(4,17);
    }

    const resetScan =() => {
        setScan(false);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            activateCamera();
        }
    }
    // @ts-ignore
    const handleBarCodeScanned = ({data}) => {
        if (!scanned) {
            const cipCode = extractCIPCode(data);
            const product = productList.find(p => String(p.CIP) === String(cipCode));
            if (product) {
                Alert.alert(
                    "Scan successful!",
                    `Product Name: ${product.Name}`, // Product found ^^
                    [
                        { text: "OK", onPress: () => resetScan() }
                    ],
                    { cancelable: false }
                );
                onCipCodeScanned(cipCode);
            } else {
                Alert.alert(
                    "Product not found",
                    "The scanned product does not exist in the database.",
                    [
                        { text: "OK", onPress: () => resetScan() }
                    ],
                    { cancelable: false }
                );
            }
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
