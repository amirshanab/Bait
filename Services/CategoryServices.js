import {db} from "../Firebaseconfig"
import {collection, getDocs} from "firebase/firestore";

//fetch categories
const Categories = async() => {
    try {
        const categoriesRef = collection(db, "Categories");
        const snapshot = await getDocs(categoriesRef);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export default Categories;