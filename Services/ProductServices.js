import {db} from '../Firebaseconfig';
import {collection, getDocs, query, where} from "firebase/firestore";

const ProductServices = async (CategoryID) => {
    try {
        // Create a reference to the 'Product' collection
        const productRef = collection(db, 'Products');

        // Construct a query to filter products based on the 'Category' field
        const q = query(productRef, where('Category', '==', `/Categories/${CategoryID}`));

        // Execute the query and retrieve the documents
        const querySnapshot = await getDocs(q);

        // Extract the data from the query snapshot
        // Log the data to the console
        // Return the data
        console.log('Query snapshot')

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export default ProductServices;
