import { createAsyncThunk } from "@reduxjs/toolkit";
import { getChats } from "../../api";

export const getChatsThunk = createAsyncThunk("chats/get",() => {
    return getChats();
})