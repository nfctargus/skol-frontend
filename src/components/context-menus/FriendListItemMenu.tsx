import { Dispatch, FC, useContext } from 'react';
import { ModalButton, ContextMenuStyle } from '../../utils/styles'
import { User } from '../../utils/types';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../utils/store';
import { deleteFriendThunk } from '../../utils/store/friends/friendThunk';
import { SocketContext } from '../../utils/context/SocketContext';

type Props = {
    friend:User;
    points: { x: number; y: number };
    setShowFriendActionsMenu:Dispatch<React.SetStateAction<boolean>>;
}
const FriendListItemMenu:FC<Props> = ({friend,points,setShowFriendActionsMenu}) => {
    const xOffset = points.x - 180;
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const socket = useContext(SocketContext);
    const handleMessageFriend = () => {
        navigate(`/friends/${friend.id}`);
    }
    const handleRemoveFriend = () => {
        dispatch(deleteFriendThunk(friend.id)).unwrap().then(({ data }) => {
            socket.emit('onFriendRemoved',data)
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