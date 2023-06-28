import { FC, useContext } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EditMessagePayload } from "../../../utils/types";
import { AppDispatch, RootState } from "../../../utils/store";
import { EditMessageActionsContainer, EditMessageInputField } from "../../../utils/styles";
import { setIsEditingGroup } from "../../../utils/store/group-messages/groupMessageSlice";
import { editGroupMessageThunk } from "../../../utils/store/group-messages/groupMessageThunk";
import { SocketContext } from "../../../utils/context/SocketContext";
import { updateGroupChat } from "../../../utils/store/group-chats/groupChatSlice";

type Props = {
    onEditMessageChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
}
export const EditGroupMessageContainer:FC<Props> = ({onEditMessageChange}) => {
    const dispatch = useDispatch<AppDispatch>();
    const socket = useContext(SocketContext);
    const { editingGroupMessage } = useSelector((state: RootState) => state.groupMessage);
    const {id} = useParams();
    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!editingGroupMessage) return;
        const payload: EditMessagePayload = {
            chatId: parseInt(id!),
            messageId: editingGroupMessage.id,
            messageContent: editingGroupMessage.messageContent || '',
        }
        dispatch(editGroupMessageThunk(payload))
        .unwrap().then(({ data }) => {
            dispatch(updateGroupChat(data.updatedChat));
        }).catch((err) => console.log(err))
        .finally(() => {
            dispatch(setIsEditingGroup(false));
            socket.emit('onGroupMessageEdit',{chatId:id,messageId:editingGroupMessage.id,messageContent:editingGroupMessage.messageContent})
        })
    }
    return (
        <form onSubmit={onSubmit} style={{width:'100%'}}>
            <EditMessageInputField value={editingGroupMessage?.messageContent} onChange={onEditMessageChange} />
            <EditMessageActionsContainer>
                escape to <small onClick={() => dispatch(setIsEditingGroup(false))}>cancel</small> • enter to <button>save</button>
            </EditMessageActionsContainer>
        </form>
    )
}