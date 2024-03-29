import { FC, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../utils/context/AuthContext";
import { AppDispatch, RootState } from "../../utils/store";
import { setEditingGroupMessage, setIsEditingGroup } from "../../utils/store/group-messages/groupMessageSlice";
import { ContextMenuStyle } from "../../utils/styles";
import { useParams } from "react-router-dom";
import { getGroupCreatorById } from "../../utils/store/group-chats/groupChatSlice";
import { deleteGroupMessageThunk } from "../../utils/store/group-messages/groupMessageThunk";
import { SocketContext } from "../../utils/context/SocketContext";

type Props = {
    points: { x: number; y: number };
};
const SelectedGroupMessageContextMenu:FC<Props> = ({ points }) => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();
    const { selectedGroupMessage: selectedMessage } = useSelector((state:RootState) => state.groupMessage);
    const creator = useSelector((state:RootState) => getGroupCreatorById(state,parseInt(id!)))

    const editMessage = () => {
        dispatch(setIsEditingGroup(true));
        dispatch(setEditingGroupMessage(selectedMessage!));
    };
    const deleteMessage = () => {
        if(!selectedMessage) return;
        dispatch(deleteGroupMessageThunk({messageId:selectedMessage.id,groupId:selectedMessage.groupChat.id}))
        socket.emit('onGroupMessageDeletion',{chatId:selectedMessage.groupChat.id,messageId:selectedMessage.id,userId:user!.id})
    }

    return (
        <ContextMenuStyle top={points.y} left={points.x} width={10}>
            <ul>
                {selectedMessage?.author.id === user?.id && <li onClick={editMessage}>Edit</li>}
                {(creator?.id === user?.id || selectedMessage?.author.id === user?.id) && <li onClick={deleteMessage}>Delete</li>}
            </ul>
        </ContextMenuStyle>
    )
}

export default SelectedGroupMessageContextMenu