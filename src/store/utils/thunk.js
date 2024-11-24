import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { collection, doc, getDocs, addDoc, setDoc } from "firebase/firestore";
import db from "./firebase"; // Ensure you have Firebase initialized in a separate `firebase.js` file





//  const URL_SERV = "https://sherylmart-products.onrender.com";


// export const fetchProducts = createAsyncThunk(
//     'products/fetchProducts',
//     async({page=1,order='asc',limit=20})=>{
//         try {
//           const response = await axios.get(`${URL_SERV}/products?_page=${page}&_order=${order}&_limit=${limit}`);
//           console.log(response.data)
//           return response.data;
//         } catch (error) {   
//           console.log('Error : ',error);
//           throw error
//         }
//     }
 
// )


const productsCollectionRef = collection(db, "products");
const cartCollectionRef = collection(db, "cart");
const orderCollectionRef = collection(db, "order");

// Thunk to Fetch Products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(productsCollectionRef);
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      console.log("Products fetched:", products);
      return products; // Return an array of product objects
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error.message);
    }
  }
);



// Thunk to Add an Item to the Cart
export const AddToCartPage = createAsyncThunk(
  "cart/AddToCartPage",
  async (item, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(cartCollectionRef, item); // Adds a new cart document
      console.log("Cart item added with ID:", docRef.id);
      return { id: docRef.id, ...item }; // Return the newly added cart item
    } catch (error) {
      console.error("Error adding to cart:", error);
      return rejectWithValue(error.message);
    }
  }
);



// Thunk to Place an Order
export const sendMessage = createAsyncThunk(
  "checkout/sendMessage",
  async (orderDetails, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(orderCollectionRef, orderDetails); // Adds a new order document
      console.log("Order placed with ID:", docRef.id);
      return { id: docRef.id, ...orderDetails }; // Return the newly added order details
    } catch (error) {
      console.error("Error placing order:", error);
      return rejectWithValue(error.message);
    }
  }
);