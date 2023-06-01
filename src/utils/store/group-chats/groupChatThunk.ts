import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGroupChats, postNewGroupChat, updateGroupChatName } from "../../api";
import { CreateGroupChatParams, EditGroupChatNameParams } from "../../types";

export const getGroupChatsThunk = createAsyncThunk("groupChats/get",() => {
    return getGroupChats();
});
export const postNewGroupChatThunk = createAsyncThunk("groupChats/new",(params:CreateGroupChatParams) => {
    return postNewGroupChat(params);
});
export const postNewGroupChatNameThunk = createAsyncThunk("groupChats/update/name",(params:EditGroupChatNameParams) => {
    return updateGroupChatName(params);
})
