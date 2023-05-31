import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit"
import { GroupChat } from "../../types";
import { getGroupChatsThunk, postNewGroupChatThunk } from "./groupChatThunk";
import { RootState } from "..";

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
        builder.addCase(postNewGroupChatThunk.fulfilled,(state,action) => {
            state.groupChats.unshift(action.payload.data);
        })
    },
})

const selectGroups = (state: RootState) => state.groupChat.groupChats;
const selectGroupId = (state: RootState, id: number) => id;
export const getGroupCreatorById = createSelector(
    [selectGroups, selectGroupId], (groups, groupId) => groups.find((g) => g.id === groupId)?.creator
);

export const { addGroupChat } = groupChatSlice.actions;
export default groupChatSlice.reducer;