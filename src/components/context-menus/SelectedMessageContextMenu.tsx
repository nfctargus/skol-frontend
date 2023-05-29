import { FC, useContext } from 'react';
import { ContextMenuStyle } from '../../utils/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../utils/store';
import { AuthContext } from '../../utils/context/AuthContext';
import { setEditingMessage, setIsEditing } from '../../utils/store/messages/privateMessageSlice';

type Props = {
    points: { x: number; y: number };
};

export const SelectedMessageContextMenu: FC<Props> = ({ points }) => {
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch<AppDispatch>();
    const { selectedMessage } = useSelector((state:RootState) => state.privateMessage);

    const editMessage = () => {
        dispatch(setIsEditing(true));
        dispatch(setEditingMessage(selectedMessage!));
    };
    return (
        <ContextMenuStyle top={points.y} left={points.x}>
            <ul>
                {selectedMessage?.author.id === user?.id && <li onClick={editMessage}>Edit</li>}
                <li>Delete</li>
            </ul>
        </ContextMenuStyle>
    );
};
