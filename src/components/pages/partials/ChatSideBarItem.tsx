import React, { FC } from 'react'
import { ChatSideBarItemContainer, ChatSideBarItemStyle, ChatUserAvatarStyle } from '../../../utils/styles'
import styles from './index.module.scss';
import avatar from '../../../assets/sampleUser.jpg';
import { shortenString } from '../../../utils/helpers';
import { useNavigate } from 'react-router-dom';

type Props = {
    userId:number;
    userName:string;
    avatarPath:string;
    lastMessage:string;
    lastMessageSentAt:string;
}
const ChatSideBarItem:FC<Props> = ({userId,userName,avatarPath,lastMessage,lastMessageSentAt}) => {
    const navigate = useNavigate();
  return (
    <ChatSideBarItemContainer onClick={() => navigate(`/chats/${userId}`)}>
        <div className={styles.chatUserAvatar}><ChatUserAvatarStyle src={avatar}/></div>
        <div className={styles.chatSideBarLayout}>
            <ChatSideBarItemStyle>
                <h1>{shortenString(userName,14)}</h1><h2>{lastMessageSentAt}</h2>
            </ChatSideBarItemStyle>
            <section>{shortenString(lastMessage,26)}</section>
        </div>
    </ChatSideBarItemContainer>
  )
}

export default ChatSideBarItem