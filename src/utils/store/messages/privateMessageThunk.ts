import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPrivateMessages, postPrivateMessage } from "../../api";
import { CreatePrivateMessageParams } from "../../types";

export const getPrivateMessagesThunk = createAsyncThunk("messages/private/get", (id:number) => {
    return getPrivateMessages(id);
})
export const postPrivateMessageThunk = createAsyncThunk("messages/private/create", (params:CreatePrivateMessageParams) => {
    return postPrivateMessage(params);
})