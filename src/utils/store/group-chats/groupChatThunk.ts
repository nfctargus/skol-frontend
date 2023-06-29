import { createAsyncThunk } from "@reduxjs/toolkit";
import { addGroupChatMembers, deleteGroupChatMember, getGroupChats, postNewGroupChat, updateGroupChatName } from "../../api";
import { CreateGroupChatParams, EditGroupChatMemberParams, EditGroupChatNameParams } from "../../types";

export const getGroupChatsThunk = createAsyncThunk("groupChats/get",() => {
    return getGroupChats();
});
export const postNewGroupChatThunk = createAsyncThunk("groupChats/new",(params:CreateGroupChatParams) => {
    return postNewGroupChat(params);
});
export const postNewGroupChatNameThunk = createAsyncThunk("groupChats/update/name",(params:EditGroupChatNameParams) => {
    return updateGroupChatName(params);
});
export const deleteGroupChatMemberThunk = createAsyncThunk("groupChats/members/delete",(params:EditGroupChatMemberParams) => {
    return deleteGroupChatMember(params);
})
export const addGroupChatMemberThunk = createAsyncThunk("groupChats/members/add",(params:EditGroupChatMemberParams) => {
    return addGroupChatMembers(params);
})