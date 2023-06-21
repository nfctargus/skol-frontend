import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteGroupMessage, editGroupMessage, getGroupMessages, postGroupMessage } from "../../api";
import { CreateMessageParams, DeleteGroupMessagePayload, EditMessagePayload } from "../../types";

export const getGroupMessagesThunk = createAsyncThunk("messages/group/get", (id:number) => {
    return getGroupMessages(id);
});
export const postGroupMessageThunk = createAsyncThunk("messages/group/create", (params:CreateMessageParams) => {
    return postGroupMessage(params);
});
export const editGroupMessageThunk = createAsyncThunk("messages/group/edit", (params:EditMessagePayload) => {
    return editGroupMessage(params);
});
export const deleteGroupMessageThunk = createAsyncThunk("messages/group/delete", (params:DeleteGroupMessagePayload) => {
    return deleteGroupMessage(params);
})