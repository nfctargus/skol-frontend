import { createAsyncThunk } from "@reduxjs/toolkit";
import { addFriend, deleteFriend, getFriends } from "../../api";

export const getFriendsThunk = createAsyncThunk("friends/getAll",() => {
    return getFriends();
});
export const addFriendThunk = createAsyncThunk("friends/add",(email:string) => {
    return addFriend(email);
});
export const deleteFriendThunk = createAsyncThunk("friends/delete",(id:number) => {
    return deleteFriend(id);
});