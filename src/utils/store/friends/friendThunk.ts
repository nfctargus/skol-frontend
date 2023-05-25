import { createAsyncThunk } from "@reduxjs/toolkit";
import { addFriend, getFriends } from "../../api";

export const getFriendsThunk = createAsyncThunk("friends/getAll",() => {
    return getFriends();
})
export const addFriendThunk = createAsyncThunk("friends/add",(id:number) => {
    return addFriend(id);
})