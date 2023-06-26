import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit"
import { GroupChat } from "../../types";
import { getGroupChatsThunk, postNewGroupChatNameThunk, postNewGroupChatThunk } from "./groupChatThunk";
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
        updateGroupChat:(state,action) => {
            console.log(action.payload)
            /* const index = state.groupChats.findIndex((group) => group.id === action.payload.id);
            state.groupChats.splice(index,1);
            state.groupChats.unshift(action.payload); */
        }
    },
    extraReducers(builder) {
        builder.addCase(getGroupChatsThunk.fulfilled,(state,action) => {
            state.groupChats = action.payload.data;
        })
        builder.addCase(postNewGroupChatThunk.fulfilled,(state,action) => {
            state.groupChats.unshift(action.payload.data);
        })
        builder.addCase(postNewGroupChatNameThunk.fulfilled,(state,action) => {
            const updatedGroup = action.payload.data;
            const index = state.groupChats.findIndex((group) => group.id === updatedGroup.id);
            state.groupChats.splice(index,1);
            state.groupChats.unshift(updatedGroup);
        })
    },
})

const selectGroups = (state: RootState) => state.groupChat.groupChats;
const selectGroupId = (state: RootState, id: number) => id;
export const getGroupCreatorById = createSelector(
    [selectGroups, selectGroupId], (groups, groupId) => groups.find((g) => g.id === groupId)?.creator
);

export const { addGroupChat,updateGroupChat } = groupChatSlice.actions;
export default groupChatSlice.reducer;