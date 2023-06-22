import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PrivateMessage } from "../../types";
import { deletePrivateMessageThunk, editPrivateMessageThunk, getPrivateMessagesThunk, postPrivateMessageThunk } from "./privateMessageThunk";

export interface PrivateMessageState {
    messages:PrivateMessage[];
    selectedMessage?:PrivateMessage;
    editingMessage?:PrivateMessage
    isEditing:boolean;
}
const initialState:PrivateMessageState = {
    messages:[],
    isEditing:false
}
export const privateMessageSlice = createSlice({
    name:'privateMessages',
    initialState,
    reducers: {
        setSelectedMessage:(state,action:PayloadAction<PrivateMessage>) => {
            state.selectedMessage = action.payload;
        },
        setEditingMessage:(state,action:PayloadAction<PrivateMessage>) => {
            state.editingMessage = action.payload;
        },
        setIsEditing:(state,action:PayloadAction<boolean>) => {
            state.isEditing = action.payload;
        },
        editMessageContent:(state,action:PayloadAction<string>) => {
            if(state.editingMessage) state.editingMessage.messageContent = action.payload;
        },
        resetEditingContainer:(state) => {
            state.isEditing = false;
            state.editingMessage = undefined;
            state.selectedMessage = undefined;
        },
        newPrivateMessage:(state,action:PayloadAction<PrivateMessage>) => {
            state.messages.unshift(action.payload);
        }
    },
    extraReducers(builder) {
        builder.addCase(getPrivateMessagesThunk.fulfilled,(state,action) =>{
            state.messages = action.payload.data
        })
        builder.addCase(postPrivateMessageThunk.fulfilled, (state,action) => {
            //state.messages.unshift(action.payload.data.message);
        })
        builder.addCase(editPrivateMessageThunk.fulfilled, (state,action) => {
            const {messageId,message} = action.payload.data;
            const messageIndex = state.messages.findIndex((message) => message.id === messageId);
            state.messages[messageIndex] = message;
        })
        builder.addCase(deletePrivateMessageThunk.fulfilled, (state,action) => {
            const {messageId} = action.payload.data;
            const messageIndex = state.messages.findIndex((message) => message.id === messageId);
            state.messages.splice(messageIndex,1);
        })
    },
})
export const { setSelectedMessage,setEditingMessage,setIsEditing,editMessageContent,resetEditingContainer,newPrivateMessage } = privateMessageSlice.actions;
export default privateMessageSlice.reducer;