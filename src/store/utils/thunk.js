import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



//  const URL_SERV = "https://sherylmart-products.onrender.com";

const URL_SERV =
  "https://raw.githubusercontent.com/userronald/sherylmart-project-data/main/db.json";


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async({page=1,order='asc',limit=20})=>{
        try {
          const response = await axios.get(`${URL_SERV}/products?_page=${page}&_order=${order}&_limit=${limit}`);
          console.log(response.data)
          return response.data;
        } catch (error) {   
          console.log('Error : ',error);
          throw error
        }
    }
 
)

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