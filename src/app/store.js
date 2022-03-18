import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "features/Cart/cartSlice";
import photoReducer from 'features/Photo/photoSlice'
import checkoutReducer from 'features/CheckOut/checkoutSlice'
import loginSlice from 'features/User/Login/loginSlice'
const rootReducer = {
    photos: photoReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    me: loginSlice
}

const store = configureStore({
    reducer: rootReducer,
    
})

export default store