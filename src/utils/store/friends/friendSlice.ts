import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { Friend } from "../../types";
import { addFriendThunk, deleteFriendThunk, getFriendsThunk } from "./friendThunk";
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
    reducers: {
        addFriend:(state,action:PayloadAction<Friend>) => {
            state.friends.unshift(action.payload)
        },
        deleteFriend:(state,action:PayloadAction<number>) => {
            const index = state.friends.findIndex((friend) => friend.id === action.payload);
            if(index !== -1) state.friends.splice(index,1);
        }
    },
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

const selectFriends = (state:RootState) => state.friend.friends;
const selectUserId = (state:RootState,id:number) => id;
export const getFriends = createSelector([selectFriends,selectUserId], (friends,userId) => {
    return friends.map((friend) => friend?.userOne.id === userId ? friend?.userTwo : friend?.userOne);
})

export const { addFriend,deleteFriend } = friendSlice.actions;

export default friendSlice.reducer;
