import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGroupMessages, postGroupMessage } from "../../api";
import { CreateMessageParams } from "../../types";

export const getGroupMessagesThunk = createAsyncThunk("messages/group/get", (id:number) => {
    return getGroupMessages(id);
});
export const postGroupMessageThunk = createAsyncThunk("messages/group/create", (params:CreateMessageParams) => {
    return postGroupMessage(params);
})