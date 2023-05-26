import { FC } from 'react';
import { ModalSectionStyle, ModalButton } from '../../../utils/styles'
import { User } from '../../../utils/types';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../utils/store';
import { deleteFriendThunk } from '../../../utils/store/friends/friendThunk';

type Props = {
    friend:User;
}
const FriendListItem:FC<Props> = ({friend}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    
    const handleMessageFriend = () => {
        navigate(`/friends/${friend.id}`);
    }
    const handleRemoveFriend = () => {
        dispatch(deleteFriendThunk(friend.id));
    }

    return (
        <ModalSectionStyle>
            {friend.firstName} {friend.lastName}
            <div className={styles.modalFriendActions}>
                <ModalButton onClick={handleMessageFriend}>Message</ModalButton>
                <ModalButton onClick={handleRemoveFriend}>Remove Friend</ModalButton>
            </div>
        </ModalSectionStyle>
    )
}

export default FriendListItem