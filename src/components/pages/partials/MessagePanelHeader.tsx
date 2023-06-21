import { ChatUserAvatarContainer, ChatUserAvatarStyle, MessagePanelHeaderStyle } from '../../../utils/styles'
import { User } from '../../../utils/types';
import avatar from '../../../assets/sampleUser.jpg';
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
                    <ChatUserAvatarStyle src={`../images/${user.profile?.avatar}`} />
                </ChatUserAvatarContainer>
                <div className={styles.messagePanelUserInfo}>
                    <h1>{formattedName}</h1>
                    <h2>Active Now</h2>
                </div>
           
        </MessagePanelHeaderStyle>
    )
}
export default MessagePanelHeader