import { createSlice } from "@reduxjs/toolkit";
import { GroupMessage } from "../../types";
import { getGroupMessagesThunk, postGroupMessageThunk } from "./groupMessageThunk";

export interface GroupMessageState {
    groupMessages:GroupMessage[];
}
const initialState:GroupMessageState = {
    groupMessages:[]
}


export const groupMessageSlice = createSlice({
    name:'group-messages',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getGroupMessagesThunk.fulfilled,(state,action) => {
            state.groupMessages = action.payload.data;
        })
        builder.addCase(postGroupMessageThunk.fulfilled, (state,action) => {
            state.groupMessages.unshift(action.payload.data.message);
        })
    },
})
export const {} = groupMessageSlice.actions;
export default groupMessageSlice.reducer;