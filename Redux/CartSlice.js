const { createSlice } = require('@reduxjs/toolkit');

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const { payload } = action;
            const existingProductIndex = state.products.findIndex(product => product.name === payload.name);

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
            state.products = state.products.filter(product => product.name !== payload.name);
        },
        incrementQuantity: (state, action) => {
            const { payload } = action;
            const product = state.products.find(product => product.name === payload.name);

            if (product) {
                // If product exists in cart, increment its quantity
                product.quantity += 1;
            } else {
                console.log("Product not found in cart");
            }
        },
        decrementQuantity: (state, action) => {
            const { payload } = action;
            const product = state.products.find(product => product.name === payload.name);

            if (product) {
                // If product exists in cart and quantity is greater than 1, decrement its quantity
                if (product.quantity > 1) {
                    product.quantity -= 1;
                }
            } else {
                console.log("Product not found in cart");
            }
        },
    },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = CartSlice.actions;
export default CartSlice.reducer;
