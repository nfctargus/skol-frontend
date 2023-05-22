import React from 'react'
import ChatSideBar from '../sidebars/ChatSideBar'
import { Outlet, useParams } from 'react-router-dom'
import ChatLandingPage from './ChatsLandingPage';

const ChatPage = () => {
    const { id } = useParams();
    return (
        <>
            <ChatSideBar />
            {!id && <ChatLandingPage />}
            <Outlet />
        </>
    )
}

export default ChatPage