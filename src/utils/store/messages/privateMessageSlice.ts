import { createSlice } from "@reduxjs/toolkit";
import { PrivateMessage } from "../../types";
import { getPrivateMessagesThunk } from "./privateMessageThunk";

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
    },
})
export const {} = privateMessageSlice.actions;
export default privateMessageSlice.reducer;