import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GroupMessage } from "../../types";
import { editGroupMessageThunk, getGroupMessagesThunk, postGroupMessageThunk } from "./groupMessageThunk";

export interface GroupMessageState {
    groupMessages:GroupMessage[];
    selectedGroupMessage?:GroupMessage;
    editingGroupMessage?:GroupMessage;
    isEditingGroup:boolean;
}
const initialState:GroupMessageState = {
    groupMessages:[],
    isEditingGroup:false
}
export const groupMessageSlice = createSlice({
    name:'group-messages',
    initialState,
    reducers: {
        setSelectedGroupMessage:(state,action:PayloadAction<GroupMessage>) => {
            state.selectedGroupMessage = action.payload;
        },
        setEditingGroupMessage:(state,action:PayloadAction<GroupMessage>) => {
            state.editingGroupMessage = action.payload;
        },
        setIsEditingGroup:(state,action:PayloadAction<boolean>) => {
            state.isEditingGroup = action.payload;
        },
        editGroupMessageContent:(state,action:PayloadAction<string>) => {
            if(state.editingGroupMessage) state.editingGroupMessage.messageContent = action.payload;
        },
        resetGroupEditingContainer:(state) => {
            state.isEditingGroup = false;
            state.editingGroupMessage = undefined;
            state.selectedGroupMessage = undefined;
        }
    },
    extraReducers(builder) {
        builder.addCase(getGroupMessagesThunk.fulfilled,(state,action) => {
            state.groupMessages = action.payload.data;
        })
        builder.addCase(postGroupMessageThunk.fulfilled, (state,action) => {
            state.groupMessages.unshift(action.payload.data.message);
        })
        builder.addCase(editGroupMessageThunk.fulfilled, (state,action) => {
            const {messageId,message} = action.payload.data;
            const messageIndex = state.groupMessages.findIndex((groupMessage) => groupMessage.id === messageId);
            state.groupMessages[messageIndex] = message;
        })
    },
})
export const { setSelectedGroupMessage,setEditingGroupMessage,setIsEditingGroup,editGroupMessageContent,resetGroupEditingContainer } = groupMessageSlice.actions;
export default groupMessageSlice.reducer;