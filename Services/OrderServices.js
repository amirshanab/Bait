import { db, authentication } from '../Firebaseconfig';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const generateOrderId = () => {
    // Generate a random 6-digit number
    return Math.floor(100000 + Math.random() * 900000);
};

const OrderServices = async (items, total, selectedDate, selectedPaymentMethod, locationUrl) => {
    try {
        const user = authentication.currentUser;
        if (user) {
            const orderId = generateOrderId(); // Generate a 6-digit order ID

            const orderRef = doc(collection(db, 'Users', user.uid, 'orders'), orderId.toString());

            await setDoc(orderRef, {
                id: orderId,
                items: items,
                totalAmount: total,
                orderDate: serverTimestamp(),
                OrderStatus: "Pending",
                ScheduledDelivery: selectedDate,
                PaymentMethod: selectedPaymentMethod,
                Address: locationUrl
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
