import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../utils/thunk";

export const ProductSlice = createSlice({
  name: "products",
  initialState: {
    lists: {
      items: [],
    },
    loading: true,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        console.log("Pending");
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log("Fulfilled");
        state.loading = false;
        state.lists.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        console.log("Rejected");
        state.loading = false;
      });
  },
});

export default ProductSlice.reducer;