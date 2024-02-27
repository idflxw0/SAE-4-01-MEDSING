import { initializeApp,getApps, FirebaseApp} from 'firebase/app';
import 'firebase/firestore';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import constants from 'expo-constants';

const configuration = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
}
let firebaseApp: FirebaseApp;
if (!getApps().length) {
    firebaseApp = initializeApp(configuration);
} else {
    firebaseApp = getApps()[0];
}
export const auth = getAuth(firebaseApp);

// Export auth functions
export const createUser = createUserWithEmailAndPassword;
export const loginUser = signInWithEmailAndPassword;
export const signOutUser = signOut;

