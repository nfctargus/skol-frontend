import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit"
import { Chat } from "../../types";
import { findOrCreateChatThunk, getChatsThunk, postNewChatThunk } from "./chatThunk";
import { RootState } from "..";

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
            if(chatIndex !== -1) state.chats.splice(chatIndex,1);
            state.chats.unshift(updatedChat);
            /* state.chats[chatIndex].lastMessageSent = updatedChat.lastMessageSent;
            state.chats[chatIndex].lastMessageSentAt = updatedChat.lastMessageSentAt;
            state.chats[chatIndex].messages = updatedChat.messages; */
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
const selectChats = (state: RootState) => state.chat.chats;
const selectChatId = (state: RootState, id: number) => id;
export const selectChatById = createSelector([selectChats, selectChatId],(chats, chatId) => {
    return chats.find((chat) => chat.id === chatId);
});

export const { addChat,updateChat } = chatSlice.actions;
export default chatSlice.reducer;