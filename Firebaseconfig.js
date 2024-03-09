const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyB0qHDb3qP-yZ2jGwpJkxapG26jKOllIfA",
    authDomain: "bait-45c95.firebaseapp.com",
    projectId: "bait-45c95",
    storageBucket: "bait-45c95.appspot.com",
    messagingSenderId: "199385336317",
    appId: "1:199385336317:web:61c5a78cb13db67736b194"
};


const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Get authentication and Firestore instances
const authentication = auth;

const db = getFirestore(app);

export { authentication, db };
