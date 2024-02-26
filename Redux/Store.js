import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice";

const store = configureStore({
    reducer: {
        cart: CartReducer, // Accessing the reducer property from CartSlice
    },
});

export default store;
