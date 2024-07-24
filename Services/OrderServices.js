import { db, authentication } from '../Firebaseconfig';
import { collection, doc, setDoc, serverTimestamp, updateDoc, getDoc } from 'firebase/firestore';

const generateOrderId = () => {
    // Generate a random 6-digit number
    return Math.floor(100000 + Math.random() * 900000);
};

// Generate an order
const OrderServices = async (items, total, selectedDate, selectedPaymentMethod, locationUrl) => {
    try {
        const user = authentication.currentUser;
        if (!user) {
            console.log('No user is logged in');
            return { status: 'error', message: 'No user is logged in' };
        }

        const orderId = generateOrderId();

        // Check stock levels for all items
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
                        if (newStock < 0) {
                            return { status: 'error', message: `Insufficient stock for product ID ${item.ID}` };
                        }
                    } else {
                        return { status: 'error', message: `Product with ID ${item.ID} has no Stock field or invalid Stock field` };
                    }
                } else {
                    return { status: 'error', message: `No such product with ID ${item.ID}` };
                }
            } else {
                return { status: 'error', message: 'Item object is missing required properties: ID or quantity' };
            }
        }

        // If all stock checks passed, proceed to create order data
        const orderRef = doc(collection(db, 'Users', user.uid, 'orders'), orderId.toString());

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

                        // Update stock in Firestore
                        await updateDoc(productRef, { Stock: newStock });
                    } else {
                        console.error(`Product with ID ${item.ID} has no Stock field or invalid Stock field`);
                    }
                } else {
                    console.error(`No such product with ID ${item.ID}`);
                }
            } else {
                console.error('Item object is missing required properties: ID or quantity');
            }
        }

        console.log('Order uploaded and stock updated successfully');
        return { status: 'success', message: 'Order uploaded and stock updated successfully' };
    } catch (error) {
        console.error('Error uploading order: ', error);
        return { status: 'error', message: `Error uploading order: ${error.message}` };
    }
};

export default OrderServices;
