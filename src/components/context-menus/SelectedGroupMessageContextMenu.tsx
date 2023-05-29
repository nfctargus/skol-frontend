import { FC, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../utils/context/AuthContext";
import { AppDispatch, RootState } from "../../utils/store";
import { setEditingMessage, setIsEditing } from "../../utils/store/group-messages/groupMessageSlice";
import { ContextMenuStyle } from "../../utils/styles";
import { useParams } from "react-router-dom";
import { getGroupCreatorById } from "../../utils/store/group-chats/groupChatSlice";

type Props = {
    points: { x: number; y: number };
};
const SelectedGroupMessageContextMenu:FC<Props> = ({ points }) => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch<AppDispatch>();
    const { selectedMessage } = useSelector((state:RootState) => state.groupMessage);
    const creator = useSelector((state:RootState) => state.groupChat.groupChats.find((groupChat) => groupChat.id === parseInt(id!))?.creator)
    console.log(creator)
    console.log(user)
    const editMessage = () => {
        dispatch(setIsEditing(true));
        dispatch(setEditingMessage(selectedMessage!));
    };
    const deleteMessage = () => {
        console.log("Deleting message")
    }

    return (
        <ContextMenuStyle top={points.y} left={points.x}>
            <ul>
                {selectedMessage?.author.id === user?.id && <li onClick={editMessage}>Edit</li>}
                {(creator?.id === user?.id || selectedMessage?.author.id === user?.id) && <li onClick={deleteMessage}>Delete</li>}
            </ul>
        </ContextMenuStyle>
    )
}

export default SelectedGroupMessageContextMenu