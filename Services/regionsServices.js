import React from 'react';
import {db} from '../Firebaseconfig'
import {collection, getDocs} from "firebase/firestore";
async function regionsServices() {
    try {
        const ref = collection(db, "Regions")
        const snapshot = await getDocs(ref);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (err) {
        console.error("Error fetching data:", err);

    }
}

export default regionsServices;