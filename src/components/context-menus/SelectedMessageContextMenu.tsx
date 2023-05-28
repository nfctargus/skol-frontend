import { Dispatch, FC, SetStateAction, useContext } from 'react';
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
    const { selectedMessage: message } = useSelector((state:RootState) => state.privateMessage);

    const editMessage = () => {
        dispatch(setIsEditing(true));
        dispatch(setEditingMessage(message!));
    };
    return (
        <ContextMenuStyle top={points.y} left={points.x}>
            <ul>
                {message?.author.id === user?.id && <li onClick={editMessage}>Edit</li>}
                <li>Delete</li>
            </ul>
        </ContextMenuStyle>
    );
};
