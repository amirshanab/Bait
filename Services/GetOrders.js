import {authentication, db} from '../Firebaseconfig';
import {collection, doc, getDocs} from 'firebase/firestore';

const getOrders = async () => {
    try {
        const user = authentication.currentUser;
        if (user) {
            const parentDocRef = doc(db, 'Users', user.uid);
            const subCollectionRef = collection(parentDocRef, 'orders');
            const querySnapshot = await getDocs(subCollectionRef);
            return querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        } else {
            console.log('No user is currently signed in.');
            return []; // Return an empty array or handle as needed
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error; // Throw the error to be caught by the caller
    }
};

export default getOrders;
