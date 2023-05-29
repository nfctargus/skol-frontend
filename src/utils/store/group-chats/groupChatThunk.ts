import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGroupChats } from "../../api";

export const getGroupChatsThunk = createAsyncThunk("groupChats/get",() => {
    return getGroupChats();
}) 