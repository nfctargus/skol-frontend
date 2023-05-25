import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Friend } from "../../types";
import { addFriendThunk, getFriendsThunk } from "./friendThunk";
import { RootState } from "..";

export interface FriendState {
    friends:Friend[];
}
  
const initialState: FriendState = {
    friends:[],
};

export const friendSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getFriendsThunk.fulfilled,(state,action) => {
            state.friends = action.payload.data
        })
        .addCase(addFriendThunk.fulfilled,(state,action) => {

            console.log(action.payload.data)
            //state.friends.push = action.payload.data
        })
    },
});

export const { } = friendSlice.actions;

export default friendSlice.reducer;
