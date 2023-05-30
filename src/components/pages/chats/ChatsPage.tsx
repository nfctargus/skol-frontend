import { useEffect } from 'react'
import ChatSideBar from '../../sidebars/ChatSideBar'
import { Outlet, useParams } from 'react-router-dom'
import LandingPage from '../LandingPage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../utils/store';
import { getFriendsThunk } from '../../../utils/store/friends/friendThunk';

const ChatPage = () => {
    const { id } = useParams();

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getFriendsThunk());
    },[])
    
    return (
        <>
            <ChatSideBar />
            {!id && <LandingPage />}
            <Outlet />
        </>
    )
}

export default ChatPage