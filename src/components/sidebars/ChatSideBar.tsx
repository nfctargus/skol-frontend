import React, { useContext, useEffect, useState } from 'react'
import { ChatSideBarStyle, SideBarSearchInput } from '../../utils/styles'
import ChatSideBarHeader from '../pages/partials/ChatSideBarHeader'
import styles from './index.module.scss';
import ChatSideBarItem from '../pages/partials/ChatSideBarItem';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../utils/store';
import { getChatsThunk } from '../../utils/store/chats/chatThunk';
import { AuthContext } from '../../utils/context/AuthContext';
import { getChatRecipient } from '../../utils/helpers';
const ChatSideBar = () => {
    const [query,setQuery] = useState("")
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useContext(AuthContext);
    const chats = useSelector((state:RootState) => (
        query ? state.chat.chats.filter((chat) => getChatRecipient(chat,user).username.toLowerCase().includes(query.toLowerCase())) 
        : state.chat.chats)
    );    
    useEffect(() => {
        dispatch(getChatsThunk());
    },[]);
    const chatFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    };
    return (
        <>
            <ChatSideBarStyle>
                <ChatSideBarHeader />
                <div className={styles.sideBarSearchContainer}>
                    <div className={styles.sideBarSearchHeader}>
                        <h1>Chats</h1>
                    </div>
                    <SideBarSearchInput placeholder='Search for Chats...' onChange={chatFilter} />
                </div>
                <div className={styles.sideBarItemContainer}>
                    {chats.map((chat) => ( <ChatSideBarItem key={chat.id} chat={chat}/> ))}
                </div>
            </ChatSideBarStyle>
        </>
    )
}
export default ChatSideBar