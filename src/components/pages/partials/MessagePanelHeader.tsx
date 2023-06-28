import { hasProfilePicture, getUserInitials } from '../../../utils/helpers';
import { ChatUserAvatarContainer, ChatUserAvatarStyle, ChatUserDefaultAvatarStyle, MessagePanelHeaderStyle } from '../../../utils/styles'
import { User } from '../../../utils/types';
import styles from './index.module.scss';
import { FC } from 'react';

type Props = {
    user:User;
}
const MessagePanelHeader:FC<Props> = ({user}) => {
    const formattedName = `${user?.firstName} ${user?.lastName}`
    return (
        <MessagePanelHeaderStyle>
                <ChatUserAvatarContainer>
                    {hasProfilePicture(user) ? (<ChatUserAvatarStyle src={`../images/${user?.profile?.avatar}`}/>) 
                    : (<ChatUserDefaultAvatarStyle>{getUserInitials(user)}</ChatUserDefaultAvatarStyle>)}
                </ChatUserAvatarContainer>
                <div className={styles.messagePanelUserInfo}>
                    <h1>{formattedName}</h1>
                    <h2>Active Now</h2>
                </div>
           
        </MessagePanelHeaderStyle>
    )
}
export default MessagePanelHeader