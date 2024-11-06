import { configureStore, combineReducers } from "@reduxjs/toolkit";
import ProductsReducer from "./reducers/products"
import  CartItemsReducer from "./reducers/cartItems";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import OrderReducer  from "./reducers/orders";
import UsersReducer from "./reducers/users";

const rootReducer = combineReducers({
  products: ProductsReducer,
  cart: CartItemsReducer,
  orders:OrderReducer,
  users:UsersReducer,
});


const persistConfig ={
    key:"root",
    storage,
    version:1,
    whitelist:["cart","users"] // this allows only to persit the cart reducer so that the product reducer won't be persist
}

const persistedReducer = persistReducer(persistConfig,rootReducer)


export const store = configureStore({
    
      reducer:persistedReducer,
      middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
         serializableCheck:false}),
    
});

export const persistor = persistStore(store);
// export default store;