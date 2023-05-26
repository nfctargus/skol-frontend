import { ChatUserAvatarStyle, MessagePanelHeaderStyle, MessagePanelUserActionsStyle, MessagePanelUserInfoStyle } from '../../../utils/styles'
import { SettingsHorizontal, Phone } from 'akar-icons'
import { useParams } from 'react-router-dom'
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
            <MessagePanelUserInfoStyle>
                <ChatUserAvatarStyle src={avatar} />
                <div className={styles.messagePanelUserInfo}>
                    <h1>{formattedName}</h1>
                    <h2>Active Now</h2>
                </div>
            </MessagePanelUserInfoStyle>
            <MessagePanelUserActionsStyle>
                <Phone strokeWidth={2} size={36} />
                <SettingsHorizontal  strokeWidth={2} size={36} />
            </MessagePanelUserActionsStyle>
        </MessagePanelHeaderStyle>
    )
}

export default MessagePanelHeader