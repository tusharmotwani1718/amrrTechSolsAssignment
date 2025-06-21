import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./Slices/itemSlice";

const store = configureStore({
    reducer: {
        items: itemReducer,
    },
});

export default store;
