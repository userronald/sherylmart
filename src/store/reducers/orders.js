import { createSlice } from "@reduxjs/toolkit";

export const OrderSlice = createSlice({
  name: "orders",
  initialState: {
    orderDetails: [],
  },
  reducers: {
    storeOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
    },

  },
});

export const {storeOrderDetails}= OrderSlice.actions;
export default OrderSlice.reducer;