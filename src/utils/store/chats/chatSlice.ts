import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Chat } from "../../types";
import { findOrCreateChatThunk, getChatsThunk, postNewChatThunk } from "./chatThunk";

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
            const updatedChat = action.payload;
            const chatIndex = state.chats.findIndex((chat) => chat.id === updatedChat.id);
            state.chats[chatIndex].lastMessageSent = updatedChat.lastMessageSent;
            state.chats[chatIndex].lastMessageSentAt = updatedChat.lastMessageSentAt;
            state.chats[chatIndex].messages = updatedChat.messages;
        },
    },
    extraReducers(builder) {
        builder.addCase(getChatsThunk.fulfilled,(state,action) => {
            state.chats = action.payload.data;
        })
        builder.addCase(postNewChatThunk.fulfilled,(state,action) => {
            state.chats.unshift(action.payload.data);
        })
        builder.addCase(findOrCreateChatThunk.fulfilled,(state,action) => {
            const newChat = action.payload.data;
            const index = state.chats.findIndex((chat) => chat.id === newChat.id);
            if(index < 0) state.chats.unshift(newChat);
        })
    },
})

export const { addChat,updateChat } = chatSlice.actions;
export default chatSlice.reducer;