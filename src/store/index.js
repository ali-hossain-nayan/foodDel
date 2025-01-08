// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import foodListReducer from "./cartSlic/foodListSlice"


const store = configureStore({
    reducer: {
        foodList: foodListReducer,
    },
});

export default store;
