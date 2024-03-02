const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyB0qHDb3qP-yZ2jGwpJkxapG26jKOllIfA",
    authDomain: "bait-45c95.firebaseapp.com",
    projectId: "bait-45c95",
    storageBucket: "bait-45c95.appspot.com",
    messagingSenderId: "199385336317",
    appId: "1:199385336317:web:61c5a78cb13db67736b194"
};


const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const db = getFirestore(app);

export { authentication, db };
