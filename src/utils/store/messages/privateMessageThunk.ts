import { createAsyncThunk } from "@reduxjs/toolkit";
import { deletePrivateMessage, editMessage as editPrivateMessage, getPrivateMessages, postPrivateMessage } from "../../api";
import { CreateMessageParams, DeleteMessagePayload } from "../../types";
import { EditMessagePayload } from "../../types";

export const getPrivateMessagesThunk = createAsyncThunk("messages/private/get", (id:number) => {
    return getPrivateMessages(id);
})
export const postPrivateMessageThunk = createAsyncThunk("messages/private/create", (params:CreateMessageParams) => {
    return postPrivateMessage(params);
})
export const editPrivateMessageThunk = createAsyncThunk("messages/private/edit", (params:EditMessagePayload) => {
    return editPrivateMessage(params);
})
export const deletePrivateMessageThunk = createAsyncThunk("messages/private/delete", (params:DeleteMessagePayload) => {
    return deletePrivateMessage(params);
})