// CartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const { payload } = action;
            const existingProductIndex = state.products.findIndex(product => product.Name === payload.name);

            if (existingProductIndex !== -1) {
                // If product already exists in cart, increment quantity
                state.products[existingProductIndex].quantity += 1;
            } else {
                // If product doesn't exist in cart, add it with quantity 1
                state.products.push({ ...payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const { payload } = action;
            state.products = state.products.filter(product => product.Name !== payload.Name);
        },
        incrementQuantity: (state, action) => {
            const { payload } = action;
            const product = state.products.find(product => product.Name === payload.Name);

            if (product) {
                // If product exists in cart, increment its quantity
                product.quantity += 1;
            } else {
                console.log("Product not found in cart");
            }
        },
        decrementQuantity: (state, action) => {
            const { payload } = action;
            const productIndex = state.products.findIndex(product => product.Name === payload.Name);

            if (productIndex !== -1) {
                // If product exists in cart and quantity is greater than 1, decrement its quantity
                if (state.products[productIndex].quantity > 1) {
                    state.products[productIndex].quantity -= 1;
                } else {
                    // If quantity is 1, remove the product from the cart
                    state.products.splice(productIndex, 1);
                }
            } else {
                console.log("Product not found in cart");
            }
        },
    },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = CartSlice.actions;

// Selector function to calculate the total number of unique products in the cart
export const selectUniqueProductCount = (state) =>
    state.cart.products.length;

export default CartSlice.reducer;
