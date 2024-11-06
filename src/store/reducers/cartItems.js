import { createSlice } from "@reduxjs/toolkit";
import { AddToCartPage } from "../utils/thunk";




export const CartItemsSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    quantity: 0,
  },
  reducers: {

    addToCart(state, action) {
      const addItemInCart = state.cartItems.find(
        (product) => product.id === action.payload.id
      );
      if (addItemInCart) {
        addItemInCart.quantity++;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },

    increaseTheQuantity(state, action) {
      const itemInCart = state.cartItems.find(
        (itemInCart) => itemInCart.id === action.payload
      );
          itemInCart.quantity++;          
    },

    decreaseTheQuantity(state, action) {
      const itemInCart = state.cartItems.find(
        (itemInCart) => itemInCart.id === action.payload
      );
      if(itemInCart.quantity > 1){
        itemInCart.quantity--;
      }else{  
        console.log("Item Can't be less thn 1")
    }   
    },

    removeItem(state,action){
      const removeItem = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      console.log("Payload:", action.payload); // Log the payload to check its value

      if (removeItem !== -1) {
        const itemToRemove = state.cartItems[removeItem];
        state.quantity -= itemToRemove.quantity;
        state.cartItems.splice(removeItem, 1);
      } else {
        console.log("Item is not found ");
      }
    },

     clearCart:(state)=>{
       state.cartItems=[];
     }
  },
});


export const {addToCart,increaseTheQuantity,decreaseTheQuantity,removeItem,clearCart}=CartItemsSlice.actions;
export default CartItemsSlice.reducer;