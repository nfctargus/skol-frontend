import { FC } from 'react';
import { ModalSectionStyle, ModalButton } from '../../../utils/styles'
import { User } from '../../../utils/types';
import styles from './index.module.scss';

type Props = {
    friend:User;
}
const FriendListItem:FC<Props> = ({friend}) => {
    return (
        <ModalSectionStyle>
            {friend.firstName} {friend.lastName}
            <div className={styles.modalFriendActions}>
                <ModalButton>Message</ModalButton>
                <ModalButton>Remove Friend</ModalButton>
            </div>
        </ModalSectionStyle>
    )
}

export default FriendListItem