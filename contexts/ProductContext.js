// UserContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import  ProductServices  from '../Services/ProductServices'; // Import your product fetching function

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await ProductServices(); // Fetch all products
                setProducts(fetchedProducts); // Update state with fetched products
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts(); // Fetch products when the component mounts
    }, []);

    const getProductsByCategory = (categoryName) => {
        // Filter products based on the provided category name
        const returned = products.filter(product => product.category === categoryName);
        console.log("returned are :\n"+returned);
        return returned
    };

    return (
        <ProductContext.Provider value={{ products, getProductsByCategory }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
