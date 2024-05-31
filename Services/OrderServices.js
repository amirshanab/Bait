import { db, authentication } from '../Firebaseconfig';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const OrderServices = async (items, total,selectedDate,selectedPaymentMethod,locationUrl ) => {
    try {
        const user = authentication.currentUser;
        if (user) {
            const orderRef = doc(collection(db, 'Users', user.uid, 'orders'));

            await setDoc(orderRef, {
                items: items,
                totalAmount: total,
                orderDate: serverTimestamp(),
                OrderStatus: "Pending",
                SchedueledDelivery:selectedDate,
                PaymentMethod: selectedPaymentMethod,
                Address:locationUrl
            });

            console.log('Order uploaded successfully');
        } else {
            console.log('No user is logged in');
        }
    } catch (error) {
        console.error('Error uploading order: ', error);
    }
};

export default OrderServices;
