import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyB0qHDb3qP-yZ2jGwpJkxapG26jKOllIfA",
    authDomain: "bait-45c95.firebaseapp.com",
    projectId: "bait-45c95",
    storageBucket: "bait-45c95.appspot.com",
    messagingSenderId: "199385336317",
    appId: "1:199385336317:web:61c5a78cb13db67736b194"
};


const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
