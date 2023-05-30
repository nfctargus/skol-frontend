import { createAsyncThunk } from "@reduxjs/toolkit";
import { findOrCreateChat, getChats, postNewChat } from "../../api";
import { CreateChatParams } from "../../types";

export const getChatsThunk = createAsyncThunk("chats/get",() => {
    return getChats();
})
export const postNewChatThunk = createAsyncThunk("chats/new",(data:CreateChatParams) => {
    return postNewChat(data);
})
export const findOrCreateChatThunk = createAsyncThunk("chats/check", (email:string) => {
    return findOrCreateChat(email);
})