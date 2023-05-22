import { ChatUserAvatarStyle, MessagePanelHeaderStyle, MessagePanelUserActionsStyle, MessagePanelUserInfoStyle } from '../../../utils/styles'
import { SettingsHorizontal, Phone } from 'akar-icons'
import { useParams } from 'react-router-dom'
import { sampleUsers } from '../../sampleData';
import { User } from '../../../utils/types';
import avatar from '../../../assets/sampleUser.jpg';
import styles from './index.module.scss';

const MessagePanelHeader = () => {
    const { id } = useParams();
    const currentUser:User | undefined = sampleUsers.find((u:any) => u.id === parseInt(id!))
    return (
        <MessagePanelHeaderStyle>
            <MessagePanelUserInfoStyle>
                <ChatUserAvatarStyle src={avatar} />
                <div className={styles.messagePanelUserInfo}>
                    <h1>{currentUser?.name}</h1>
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