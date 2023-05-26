import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPrivateMessages } from "../../api";

export const getPrivateMessagesThunk = createAsyncThunk("messages/private/get", (id:number) => {
    return getPrivateMessages(id);
})