import { FC, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../utils/context/AuthContext";
import { AppDispatch, RootState } from "../../utils/store";
import { setEditingGroupMessage, setIsEditingGroup } from "../../utils/store/group-messages/groupMessageSlice";
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
    const { selectedGroupMessage: selectedMessage } = useSelector((state:RootState) => state.groupMessage);
    const creator = useSelector((state:RootState) => getGroupCreatorById(state,parseInt(id!)))

    const editMessage = () => {
        dispatch(setIsEditingGroup(true));
        dispatch(setEditingGroupMessage(selectedMessage!));
    };
    const deleteMessage = () => {
        console.log("Deleting message")
    }

    return (
        <ContextMenuStyle top={points.y} left={points.x} width={8}>
            <ul>
                {selectedMessage?.author.id === user?.id && <li onClick={editMessage}>Edit</li>}
                {(creator?.id === user?.id || selectedMessage?.author.id === user?.id) && <li onClick={deleteMessage}>Delete</li>}
            </ul>
        </ContextMenuStyle>
    )
}

export default SelectedGroupMessageContextMenu