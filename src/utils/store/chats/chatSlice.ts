import { createSlice } from "@reduxjs/toolkit"
import { Chat } from "../../types";
import { getChatsThunk } from "./chatThunk";

export interface ChatState {
    chats:Chat[];
}
const initialState:ChatState = {
    chats:[],
}
export const chatSlice = createSlice({
    name:'chats',
    initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder.addCase(getChatsThunk.fulfilled,(state,action) => {
            state.chats = action.payload.data
        })
    },
})

export const { } = chatSlice.actions;
export default chatSlice.reducer;