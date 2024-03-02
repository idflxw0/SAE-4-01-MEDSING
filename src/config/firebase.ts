import { initializeApp,getApps, FirebaseApp} from 'firebase/app';
import 'firebase/firestore';
// @ts-ignore
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,getReactNativePersistence } from 'firebase/auth';
import {getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import constants from 'expo-constants';
import { initializeAuth } from 'firebase/auth';

const configuration = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId:process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket:process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId:process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID ,
    appId:process.env.EXPO_PUBLIC_APP_ID ,
    measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID
}
let firebaseApp: FirebaseApp;
if (!getApps().length) {
    firebaseApp = initializeApp(configuration);
} else {
    firebaseApp = getApps()[0];
}
let auth;
if (!getAuth(firebaseApp)) {
    auth = initializeAuth(firebaseApp,{
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
}else {
    auth = getAuth(firebaseApp);
}
export {auth};
export const db = getFirestore(firebaseApp);

// Export auth functions
export const createUser = createUserWithEmailAndPassword;
export const loginUser = signInWithEmailAndPassword;
export const signOutUser = signOut;

