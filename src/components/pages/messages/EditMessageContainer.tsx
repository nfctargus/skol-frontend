import { FC,useContext } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EditMessagePayload } from "../../../utils/types";
import { AppDispatch, RootState } from "../../../utils/store";
import { EditMessageActionsContainer, EditMessageInputField } from "../../../utils/styles";
import { setIsEditing } from "../../../utils/store/messages/privateMessageSlice";
import { editPrivateMessageThunk } from "../../../utils/store/messages/privateMessageThunk";
import { SocketContext } from "../../../utils/context/SocketContext";
import { updateChat } from "../../../utils/store/chats/chatSlice";

type Props = {
    onEditMessageChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
}
export const EditMessageContainer:FC<Props> = ({onEditMessageChange}) => {
    const dispatch = useDispatch<AppDispatch>();
    const socket = useContext(SocketContext);

    const { editingMessage } = useSelector((state: RootState) => state.privateMessage);
    const {id} = useParams();
    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!editingMessage) return;
        const payload: EditMessagePayload = {
            chatId: parseInt(id!),
            messageId: editingMessage.id,
            messageContent: editingMessage.messageContent || '',
        }                
        dispatch(editPrivateMessageThunk(payload))
            .unwrap().then(({ data }) => {
                dispatch(updateChat(data.updatedChat));
            }).catch((err) => console.log(err))
            .finally(() => {
                dispatch(setIsEditing(false))
                socket.emit('privateMessageEdited',{chatId:id,messageId:editingMessage.id,messageContent:editingMessage.messageContent})
            })
    }
    return (
        <form onSubmit={onSubmit} style={{width:'100%'}}>
            <EditMessageInputField value={editingMessage?.messageContent} onChange={onEditMessageChange} />
            <EditMessageActionsContainer>
                escape to <small onClick={() => dispatch(setIsEditing(false))}>cancel</small> • enter to <button>save</button>
            </EditMessageActionsContainer>
        </form>
    )
}