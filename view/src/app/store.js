import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "../features/sessionSlice";
import productReducer from "../features/productSlice";
import cartSlice from "../features/cartSlice";
import orderSlice from "../features/orderSlice";

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        product: productReducer,
        cart: cartSlice,
        order: orderSlice,
    }
});

