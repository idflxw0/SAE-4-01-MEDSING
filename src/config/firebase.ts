import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut } from 'firebase/auth';
import constants from 'expo-constants';

const configuration = {
    apiKey: "AIzaSyCLFfV-0SqBQIwKcbZdL7r14YB_Ul4k6Xs",
    authDomain: "medsing-a70de.firebaseapp.com",
    projectId: "medsing-a70de",
    storageBucket: "medsing-a70de.appspot.com",
    messagingSenderId: "75389818076",
    appId: "1:75389818076:web:4a2dddff088995a94ed019",
    measurementId: "G-TB7K703250"
}

export const firebaseApp = initializeApp(configuration);
export const auth = getAuth(firebaseApp);
export const createUser = createUserWithEmailAndPassword;
export const loginUser = signInWithEmailAndPassword;
export const signOutUser = signOut;

