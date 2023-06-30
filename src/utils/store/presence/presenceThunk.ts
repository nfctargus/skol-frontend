import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllFriendsPresence, getUserPresence, updateUserPresence } from "../../api";

export const getUserPresenceThunk = createAsyncThunk("presence/get", (id:number) => {
    return getUserPresence(id);
});
export const getAllFriendsPresenceThunk = createAsyncThunk("presence/friends/all", () => {
    return getAllFriendsPresence();
});
export const updateUserPresenceThunk = createAsyncThunk("presence/update", (presence:string) => {
    return updateUserPresence(presence);
});