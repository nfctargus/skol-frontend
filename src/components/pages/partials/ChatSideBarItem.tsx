import { FC, useContext } from 'react'
import { ChatSideBarItemContainer, ChatSideBarItemStyle, ChatUserAvatarStyle } from '../../../utils/styles'
import styles from './index.module.scss';
import avatar from '../../../assets/sampleUser.jpg';
import { getChatRecipient, shortenString } from '../../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { Chat } from '../../../utils/types';
import { AuthContext } from '../../../utils/context/AuthContext';
import { enAU } from 'date-fns/locale'
import setDefaultOptions from 'date-fns/setDefaultOptions';
import formatRelative from 'date-fns/format';
setDefaultOptions({ locale: enAU })

type Props = {
    chat:Chat;
}
const ChatSideBarItem:FC<Props> = ({chat}) => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext)
    const recipient = getChatRecipient(chat,user)
    return (
        <ChatSideBarItemContainer onClick={() => navigate(`/chats/${chat.id}`)}>
            <div className={styles.chatUserAvatar}><ChatUserAvatarStyle src={avatar}/></div>
            <div className={styles.chatSideBarLayout}>
                <ChatSideBarItemStyle>
                    <h1>{recipient && shortenString(recipient.username,14)}</h1>
                    <h2>{formatRelative(new Date(chat.lastMessageSentAt),"dd-LL")}</h2>
                </ChatSideBarItemStyle>
                <section>{chat.lastMessageSent ? shortenString(chat.lastMessageSent.messageContent,26) : "No message history"}</section>
            </div>
        </ChatSideBarItemContainer>
    )
}

export default ChatSideBarItem