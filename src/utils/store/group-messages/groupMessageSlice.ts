import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GroupMessage } from "../../types";
import { editPrivateMessageThunk, getGroupMessagesThunk, postGroupMessageThunk } from "./groupMessageThunk";

export interface GroupMessageState {
    groupMessages:GroupMessage[];
    selectedMessage?:GroupMessage;
    editingMessage?:GroupMessage;
    isEditing:boolean;
}
const initialState:GroupMessageState = {
    groupMessages:[],
    isEditing:false
}
export const groupMessageSlice = createSlice({
    name:'group-messages',
    initialState,
    reducers: {
        setSelectedMessage:(state,action:PayloadAction<GroupMessage>) => {
            state.selectedMessage = action.payload;
        },
        setEditingMessage:(state,action:PayloadAction<GroupMessage>) => {
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
        }
    },
    extraReducers(builder) {
        builder.addCase(getGroupMessagesThunk.fulfilled,(state,action) => {
            state.groupMessages = action.payload.data;
        })
        builder.addCase(postGroupMessageThunk.fulfilled, (state,action) => {
            state.groupMessages.unshift(action.payload.data.message);
        })
        builder.addCase(editPrivateMessageThunk.fulfilled, (state,action) => {
            const {messageId,message} = action.payload.data;
            const messageIndex = state.groupMessages.findIndex((groupMessage) => groupMessage.id === messageId);
            state.groupMessages[messageIndex] = message;
        })
    },
})
export const { setSelectedMessage,setEditingMessage,setIsEditing,editMessageContent,resetEditingContainer } = groupMessageSlice.actions;
export default groupMessageSlice.reducer;