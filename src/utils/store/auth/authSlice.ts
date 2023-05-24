import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";
import { userLoginThunk } from "./authThunk";
import { RootState } from "..";

export interface AuthState {
	user:User;
    loggedIn:boolean;
}

const initialState: AuthState = {
	user: {id:"",email:"",firstName:"",lastName:"",username:""},
    loggedIn:false
};


export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
        setUser:(state,action:PayloadAction<User>) => {
            state.user = action.payload; 
        }
    },
	extraReducers: (builder) => {
		builder
		.addCase(userLoginThunk.fulfilled, (state,action) => {state.loggedIn = true})
        .addCase(userLoginThunk.pending, (state,action) => {state.loggedIn = false})
        .addCase(userLoginThunk.rejected, (state,action) => {state.loggedIn = false})
	},
});

export const currentUser = (state: RootState) => state.auth.user;
export const isLoggedIn = (state: RootState) => state.auth.loggedIn;

export const { setUser } = authSlice.actions;
export default authSlice.reducer;