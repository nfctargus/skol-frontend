import React, { FC } from 'react'
import { ChatSideBarItemContainer, ChatSideBarItemStyle, ChatUserAvatarStyle } from '../../../utils/styles'
import styles from './index.module.scss';
import avatar from '../../../assets/sampleUser.jpg';
import { shortenString } from '../../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../utils/types';

type Props = {
    user:User;
}
const ChatSideBarItem:FC<Props> = ({user}) => {
    const navigate = useNavigate();
  return (
    <ChatSideBarItemContainer onClick={() => navigate(`/chats/${user.id}`)}>
        <div className={styles.chatUserAvatar}><ChatUserAvatarStyle src={avatar}/></div>
        <div className={styles.chatSideBarLayout}>
            <ChatSideBarItemStyle>
                <h1>{shortenString(user.firstName + user.lastName,14)}</h1>
                <h2>Date</h2>
            </ChatSideBarItemStyle>
            <section>Hello{/* {shortenString(user.lastMessage,26)} */}</section>
        </div>
    </ChatSideBarItemContainer>
  )
}

export default ChatSideBarItem