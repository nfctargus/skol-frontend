import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";
import { getAllFriendsPresenceThunk, getUserPresenceThunk, updateUserPresenceThunk } from "./presenceThunk";

export interface PresenceState {
    presence:User[];
}
const initialState:PresenceState = {
    presence:[]
}
export const presenceSlice = createSlice({
    name: 'presence',
    initialState,
    reducers:{
        addFriendToPresence:(state,action:PayloadAction<User>) => {
            state.presence.push(action.payload);
        },
        deleteFriendFromPresence:(state,action:PayloadAction<number>) => {
            const index = state.presence.findIndex((friend) => friend.id === action.payload);
            if(index !== -1) state.presence.splice(index,1);
        }
    },
    extraReducers(builder) {
        builder
        .addCase(getUserPresenceThunk.fulfilled,(state,action) => {
            const index = state.presence.findIndex((presence) => presence.id === action.payload.data.id);
            if(index !== -1) state.presence.splice(index,1);
            state.presence.unshift(action.payload.data);
        })
        .addCase(getAllFriendsPresenceThunk.fulfilled,(state,action) => {
            state.presence = action.payload.data;
        })
        .addCase(updateUserPresenceThunk.fulfilled,(state,action) => {
            const index = state.presence.findIndex((presence) => presence.id === action.payload.data.id);
            if(index !== -1) state.presence.splice(index,1);
            state.presence.unshift(action.payload.data);
        })
    }
});
export const {addFriendToPresence,deleteFriendFromPresence} = presenceSlice.actions;
export default presenceSlice.reducer;