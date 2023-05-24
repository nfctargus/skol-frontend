import React, { useEffect, useState } from 'react'
import { ChatSideBarStyle, SideBarSearchInput } from '../../utils/styles'
import ChatSideBarHeader from '../pages/partials/ChatSideBarHeader'
import styles from './index.module.scss';
import { MoreVerticalFill } from 'akar-icons';
import ChatSideBarItem from '../pages/partials/ChatSideBarItem';

import { User } from '../../utils/types';
const ChatSideBar = () => {
    const [users,setUsers] = useState<User[]>([]);
    useEffect(() => {
        //setUsers(sampleUsers);
    },[])
    const chatFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value
        if(searchTerm.length > 0) {
            const filteredUsers = users.filter(
                (u) => u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                u.username.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setUsers(filteredUsers)
        } else setUsers([]);
    }
    return (
        <>
            <ChatSideBarStyle>
                <ChatSideBarHeader />
                <div className={styles.sideBarSearchContainer}>
                    <div className={styles.sideBarSearchHeader}>
                        <h1>Chats</h1>
                        <section><MoreVerticalFill strokeWidth={1} size={20} /></section>
                    </div>
                    <SideBarSearchInput placeholder='Search for Chats...' onChange={chatFilter} />
                </div>
                <div className={styles.sideBarItemContainer}>
                    {users.map((user) => ( <ChatSideBarItem key={user.id} user={user}/> ))}
                </div>
            </ChatSideBarStyle>
        </>
    )
}

export default ChatSideBar