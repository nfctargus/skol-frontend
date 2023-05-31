import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGroupChats, postNewGroupChat } from "../../api";
import { CreateGroupChatParams } from "../../types";

export const getGroupChatsThunk = createAsyncThunk("groupChats/get",() => {
    return getGroupChats();
}) 
export const postNewGroupChatThunk = createAsyncThunk("groupChats/new",(params:CreateGroupChatParams) => {
    return postNewGroupChat(params);
})