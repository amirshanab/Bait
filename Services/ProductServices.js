import {db} from '../Firebaseconfig';
import {collection, getDocs, query, where} from "firebase/firestore";
import {useProducts} from "../contexts/ProductContext";

const ProductServices =  (CategoryID) => {
    const {products} = useProducts()
    if (!products) {
        return []; // Return empty array or handle the null case as needed
    }
    const filteredProducts = products.filter(product => product.Category === "/Categories/"+CategoryID);

    return filteredProducts
};

export default ProductServices;
