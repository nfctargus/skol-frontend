import React from 'react'
import { ChatSideBarStyle, SideBarSearchInput } from '../../utils/styles'
import ChatSideBarHeader from '../pages/partials/ChatSideBarHeader'
import styles from './index.module.scss';
import { MoreVerticalFill } from 'akar-icons';
import ChatSideBarItem from '../pages/partials/ChatSideBarItem';
import { sampleUsers } from '../sampleData';
const ChatSideBar = () => {
  return (
    <>
        <ChatSideBarStyle>
            <ChatSideBarHeader />
            <div className={styles.sideBarSearchContainer}>
                <div className={styles.sideBarSearchHeader}>
                    <h1>Chats</h1>
                    <section><MoreVerticalFill strokeWidth={1} size={20} /></section>
                </div>
                <SideBarSearchInput placeholder='Search for Chats...' />
            </div>
            <div className={styles.sideBarItemContainer}>
                {sampleUsers.map((user) => ( <ChatSideBarItem userId={user.id} userName={user.name} avatarPath={user.avatar} lastMessage={user.lastMessage} lastMessageSentAt={user.lastMessageSentAt}/> ))}
                
            </div>
        </ChatSideBarStyle>
    </>
  )
}

export default ChatSideBar