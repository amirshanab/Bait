import {db} from '../Firebaseconfig';
import {collection, getDocs, query, where} from "firebase/firestore";
import {useProducts} from "../contexts/ProductContext";

const ProductServices =  (CategoryID) => {
    const {products} = useProducts()
        //console.log('products are :' + products)
    if (!products) {
        console.log("Products are not yet available.");
        return []; // Return empty array or handle the null case as needed
    }
    const filteredProducts = products.filter(product => product.Category === "/Categories/"+CategoryID);
    console.log("Products are available.");

    return filteredProducts
};

export default ProductServices;
