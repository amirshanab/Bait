import { db, authentication } from '../Firebaseconfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

// Function to fetch user's purchased items
const getUserPurchasedItems = async () => {
    const user = authentication.currentUser;
    if (!user) {
        console.log('No user is logged in');
        return [];
    }

    try {
        const ordersSnapshot = await getDocs(collection(db, 'Users', user.uid, 'orders'));
        let purchasedItems = [];

        ordersSnapshot.forEach(orderDoc => {
            const orderData = orderDoc.data();
            purchasedItems = [...purchasedItems, ...orderData.items];
        });
        return purchasedItems;
    } catch (error) {
        console.error('Error fetching user purchased items:', error);
        return [];
    }
};

// Function to get similar users' purchased items
const getSimilarUsersPurchasedItems = async (purchasedItems) => {
    try {
        const usersSnapshot = await getDocs(collection(db, 'Users'));
        let similarUsersItems = [];

        for (const userDoc of usersSnapshot.docs) {
            const userId = userDoc.id;
            if (userId !== authentication.currentUser.uid) {
                const ordersSnapshot = await getDocs(collection(db, 'Users', userId, 'orders'));
                ordersSnapshot.forEach(orderDoc => {
                    const orderData = orderDoc.data();
                    const hasSimilarItems = orderData.items.some(item => purchasedItems.some(purchasedItem => purchasedItem.ID === item.ID));
                    if (hasSimilarItems) {
                        similarUsersItems = [...similarUsersItems, ...orderData.items];
                    }
                });
            }
        }

        // Remove duplicates and items the user has already purchased
        const purchasedItemIds = purchasedItems.map(item => item.ID);
        similarUsersItems = similarUsersItems
            .filter((item, index, self) => self.findIndex(i => i.ID === item.ID) === index)
            .filter(item => !purchasedItemIds.includes(item.ID));
        return similarUsersItems;
    } catch (error) {
        console.error('Error fetching similar users\' items:', error);
        return [];
    }
};

// Function to get recommendations based on similar users' purchases
const getRecommendations = async () => {
    const user = authentication.currentUser;
    if (!user) {
        console.log('No user is logged in');
        return [];
    }

    try {
        const purchasedItems = await getUserPurchasedItems();
        const similarUsersItems = await getSimilarUsersPurchasedItems(purchasedItems);


        return similarUsersItems;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return [];
    }
};

export default getRecommendations;

// import { db, authentication } from '../Firebaseconfig';
// import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
//
// // Function to fetch user's purchased items
// const getUserPurchasedItems = async () => {
//     const user = authentication.currentUser;
//     if (!user) {
//         console.log('No user is logged in');
//         return [];
//     }
//
//     try {
//         const ordersSnapshot = await getDocs(collection(db, 'Users', user.uid, 'orders'));
//         let purchasedItems = [];
//
//         ordersSnapshot.forEach(orderDoc => {
//             const orderData = orderDoc.data();
//             purchasedItems = [...purchasedItems, ...orderData.items];
//         });
//         return purchasedItems;
//     } catch (error) {
//         console.error('Error fetching user purchased items:', error);
//         return [];
//     }
// };
//
// // Function to get recommendations based on user's past purchases
// const getRecommendations = async () => {
//     const user = authentication.currentUser;
//     if (!user) {
//         console.log('No user is logged in');
//         return [];
//     }
//
//     try {
//         const purchasedItems = await getUserPurchasedItems();
//         const purchasedItemIds = purchasedItems.map(item => item.ID);
//         const categories = new Set(purchasedItems.map(item => item.Category));
//
//         // Fetch products from the same categories
//         const productsSnapshot = await getDocs(collection(db, 'Products'));
//         let recommendedItems = [];
//
//         productsSnapshot.forEach(productDoc => {
//             const productData = productDoc.data();
//             if (categories.has(productData.Category) && !purchasedItemIds.includes(productData.ID)) {
//                 recommendedItems.push({ id: productDoc.id, ...productData });
//             }
//         });
//         return recommendedItems;
//     } catch (error) {
//         console.error('Error fetching recommendations:', error);
//         return [];
//     }
// };
//
// export default getRecommendations;

