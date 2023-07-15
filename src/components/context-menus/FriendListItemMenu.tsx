import { Dispatch, FC, useContext } from 'react';
import { ModalButton, ContextMenuStyle } from '../../utils/styles'
import { User } from '../../utils/types';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../utils/store';
import { deleteFriendThunk } from '../../utils/store/friends/friendThunk';
import { SocketContext } from '../../utils/context/SocketContext';
import { findOrCreateChatThunk } from '../../utils/store/chats/chatThunk';
import { deleteFriendFromPresence } from '../../utils/store/presence/presenceSlice';

type Props = {
    friend:User;
    points: { x: number; y: number };
    setShowFriendActionsMenu:Dispatch<React.SetStateAction<boolean>>;
}
const FriendListItemMenu:FC<Props> = ({friend,points,setShowFriendActionsMenu}) => {
    const xOffset = 90;
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const socket = useContext(SocketContext);
    const handleMessageFriend = () => {
        dispatch(findOrCreateChatThunk(friend.email)).unwrap().then(({data}) => {
            if(data) navigate(`/chats/${data.id}`);
        });
    }
    const handleRemoveFriend = () => {
        dispatch(deleteFriendThunk(friend.id)).unwrap().then(({ data }) => {
            socket.emit('onFriendRemoved',data);
            dispatch(deleteFriendFromPresence(friend.id));
            setShowFriendActionsMenu(false);
        }).catch((err) => console.log(err));
        
        
    }

    return (
        <ContextMenuStyle left={xOffset} top={points.y} width={15}>
            <div className={styles.modalFriendActionsContainer}>
                <h1>{friend.firstName} {friend.lastName}</h1>
                <div className={styles.modalFriendActions}>
                    <ModalButton onClick={handleMessageFriend}>Message</ModalButton>
                    <ModalButton onClick={handleRemoveFriend}>Remove Friend</ModalButton>
                </div>
            </div>
        </ContextMenuStyle>
    )
}

export default FriendListItemMenu