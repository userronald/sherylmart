import { createSlice } from "@reduxjs/toolkit";

export  const UsersSlice = createSlice({
    name:"users",
    initialState:{
        customerName:[],
        userInitials:[]
    },
    reducers:{
       addToUser(state,action){
            state.customerName = action.payload

            const nameParts= action.payload.split(" ");
             state.userInitials = nameParts
                                    .map((part)=>part[0])
                                    .join("")
                                    .toUpperCase();
       },

         logOutUser(state){
        state.customerName=null;
    }
    }
  
})

export const {addToUser,logOutUser} = UsersSlice.actions;
export default UsersSlice.reducer;