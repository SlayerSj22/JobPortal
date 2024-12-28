import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null
    },
    reducers:{
        //actions
        setLoading:(state,action)=>{
            state.loading=action.payload;
        },
        setUser:(state,action)=>{
            state.user=action.payload;
        }

    }
})

export const {setLoading,setUser} = authSlice.actions;
export default authSlice.reducer
 //.reducer is function provided by redux and take state and action as argument and update state with the help of the actions