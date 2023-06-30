import { createSlice } from "@reduxjs/toolkit";
import { User, UserPresence } from "../../types";
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
    reducers:{},
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
export const {} = presenceSlice.actions;
export default presenceSlice.reducer;