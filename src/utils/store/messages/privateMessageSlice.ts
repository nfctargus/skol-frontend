import { createSlice } from "@reduxjs/toolkit";
import { PrivateMessage } from "../../types";
import { getPrivateMessagesThunk, postPrivateMessageThunk } from "./privateMessageThunk";
import { updateChat } from "../chats/chatSlice";

export interface PrivateMessageState {
    messages:PrivateMessage[];
}
const initialState:PrivateMessageState = {
    messages:[],
}
export const privateMessageSlice = createSlice({
    name:'privateMessages',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getPrivateMessagesThunk.fulfilled,(state,action) =>{
            state.messages = action.payload.data
        })
        builder.addCase(postPrivateMessageThunk.fulfilled, (state,action) => {
            state.messages.unshift(action.payload.data.message);
        })
    },
})
export const {} = privateMessageSlice.actions;
export default privateMessageSlice.reducer;