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


 export const AddToCartPage=createAsyncThunk(
  // slicename/action name
    'cart/AddToCartPage',
   async(item)=>{
       try{
        await axios({
          method:'POST',
          url:`${URL_SERV}/cart`,
          item
        });
        return true;
      
       }catch (error){
           console.log('Error: ',error)
       }
   }
 )

 export const sendMessage = createAsyncThunk(
  "checkout/sendMessage",
  async(data)=>{
    try{
      await axios({
        method:'POST',
        url:`${URL_SERV}/order`,
        data
      });
      return true;
    }
    catch(error){
      console.log("Error", error);
    }
  }
 );