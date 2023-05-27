import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Chat } from "../../types";
import { getChatsThunk, postNewChatThunk } from "./chatThunk";

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
        addChat:(state,action:PayloadAction<Chat>) => {
            state.chats.unshift(action.payload)
        },
        updateChat:(state,action:PayloadAction<Chat>) => {
            console.log('updating chat')
            const updatedChat = action.payload;
            const chatIndex = state.chats.findIndex((chat) => chat.id === updatedChat.id);
            state.chats.splice(chatIndex,1);
            state.chats.unshift(updatedChat);
        },
    },
    extraReducers(builder) {
        builder.addCase(getChatsThunk.fulfilled,(state,action) => {
            state.chats = action.payload.data;
        })
        builder.addCase(postNewChatThunk.fulfilled,(state,action) => {
            //state.chats.unshift(action.payload.data);
        })
    },
})

export const { addChat,updateChat } = chatSlice.actions;
export default chatSlice.reducer;