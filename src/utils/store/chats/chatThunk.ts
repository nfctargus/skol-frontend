import { createAsyncThunk } from "@reduxjs/toolkit";
import { getChats, postNewChat } from "../../api";
import { CreateChatParams } from "../../types";

export const getChatsThunk = createAsyncThunk("chats/get",() => {
    return getChats();
})
export const postNewChatThunk = createAsyncThunk("chats/new",(data:CreateChatParams) => {
    return postNewChat(data);
})