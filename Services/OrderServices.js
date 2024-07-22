import { db, authentication } from '../Firebaseconfig';
import { collection, doc, setDoc, serverTimestamp, updateDoc, getDoc } from 'firebase/firestore';

const generateOrderId = () => {
    // Generate a random 6-digit number
    return Math.floor(100000 + Math.random() * 900000);
};

const OrderServices = async (items, total, selectedDate, selectedPaymentMethod, locationUrl) => {
    console.log(items)
    try {
        const user = authentication.currentUser;
        if (user) {
            const orderId = generateOrderId();

            // Create a reference to the order document
            const orderRef = doc(collection(db, 'Users', user.uid, 'orders'), orderId.toString());

            // Create order data
            const orderData = {
                id: orderId,
                items: items,
                totalAmount: total,
                orderDate: serverTimestamp(),
                OrderStatus: "Pending",
                ScheduledDelivery: selectedDate,
                PaymentMethod: selectedPaymentMethod,
                Address: locationUrl
            };
            console.log("item is " + orderData.items)

            // Upload order data to Firestore
            await setDoc(orderRef, orderData);

            // Update stock for each item
            for (const item of items) {
                if (item && item.ID && item.quantity !== undefined) {
                    const productRef = doc(db, 'Products', item.ID);

                    // Get current product data
                    const productSnap = await getDoc(productRef);
                    if (productSnap.exists()) {
                        const productData = productSnap.data();

                        // Check if Stock is available and valid
                        if (productData && productData.Stock !== undefined) {
                            const newStock = productData.Stock - item.quantity;

                            // Check if stock is sufficient
                            if (newStock >= 0) {
                                // Update stock in Firestore
                                await updateDoc(productRef, { Stock: newStock });
                            } else {
                                console.error(`Insufficient stock for product ID ${item.ID}`);
                            }
                        } else {
                            console.error(`Product with ID ${item.ID} has no Stock field or invalid Stock field`);
                        }
                    } else {
                        console.error(`No such product with ID ${item.ID}`);
                    }
                } else {
                    console.error('Item object is missing required properties: id or quantity' + orderData);
                }
            }

            console.log('Order uploaded and stock updated successfully');
        } else {
            console.log('No user is logged in');
        }
    } catch (error) {
        console.error('Error uploading order: ', error);
    }
};

export default OrderServices;
