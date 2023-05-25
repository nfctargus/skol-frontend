import React, { useContext, useEffect } from 'react'
import ChatSideBar from '../sidebars/ChatSideBar'
import { Outlet, useParams } from 'react-router-dom'
import ChatLandingPage from './ChatsLandingPage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../utils/store';
import { getFriendsThunk } from '../../utils/store/friends/friendThunk';
import { returnFriendDetails } from '../../utils/helpers';
import { AuthContext } from '../../utils/context/AuthContext';

const ChatPage = () => {
    const { id } = useParams();
    const {user} = useContext(AuthContext)
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getFriendsThunk());
    },[])
    return (
        <>
            <ChatSideBar />
            {!id && <ChatLandingPage />}
            <Outlet />
        </>
    )
}

export default ChatPage