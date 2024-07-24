import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebaseconfig";
//fetch dishes
const DishesServices = async (regionID) => {
    try {
        const ref = collection(db, `Regions/${regionID}/Dishes`);
        const snapshot = await getDocs(ref);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (err) {
        console.error("Error fetching data:", err);
        return []; // return an empty array on error
    }
};

export default DishesServices;
