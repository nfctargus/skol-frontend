import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { GroupChat } from "../../types";
import { getGroupChatsThunk } from "./groupChatThunk";

export interface GroupChatState {
    groupChats:GroupChat[];
}
const initialState:GroupChatState = {
    groupChats:[]
}
export const groupChatSlice = createSlice({
    name:'group-chats',
    initialState,
    reducers: {
        addGroupChat:(state,action:PayloadAction<GroupChat>) => {
            state.groupChats.unshift(action.payload)
        },
    },
    extraReducers(builder) {
        builder.addCase(getGroupChatsThunk.fulfilled,(state,action) => {
            state.groupChats = action.payload.data;
        })
    },
})
export const { addGroupChat } = groupChatSlice.actions;
export default groupChatSlice.reducer;