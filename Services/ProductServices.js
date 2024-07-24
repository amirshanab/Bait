import {useProducts} from "../contexts/ProductContext";
//fetch products from db
const ProductServices =  (CategoryID) => {
    const {products} = useProducts()
    if (!products) {
        return []; // Return empty array or handle the null case as needed
    }
    const filteredProducts = products.filter(product => product.Category === "/Categories/"+CategoryID);

    return filteredProducts
};

export default ProductServices;
