import { createSlice } from "@reduxjs/toolkit";
import { Friend } from "../../types";
import { addFriendThunk, deleteFriendThunk, getFriendsThunk } from "./friendThunk";

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
            state.friends.push(action.payload.data)
        })
        .addCase(deleteFriendThunk.fulfilled,(state,action) => {
            const { id } = action.payload.data;
            const friendIndex = state.friends.findIndex((friend) => friend.id === id);
            state.friends.splice(friendIndex,1);
        })
    },
});

export const { } = friendSlice.actions;

export default friendSlice.reducer;
