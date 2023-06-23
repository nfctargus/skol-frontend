import { useEffect,useContext, useState } from 'react'
import ChatSideBar from '../../sidebars/ChatSideBar'
import { Outlet, useParams } from 'react-router-dom'
import LandingPage from '../LandingPage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../utils/store';
import { getFriendsThunk } from '../../../utils/store/friends/friendThunk';
import { SocketContext } from '../../../utils/context/SocketContext';
import { newPrivateMessage } from '../../../utils/store/messages/privateMessageSlice';
import { NewPrivateMessageResponse } from '../../../utils/types';
import { updateChat }  from '../../../utils/store/chats/chatSlice';

const ChatPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const socket = useContext(SocketContext);
    const [isConnected, setIsConnected] = useState(socket.connected);
    useEffect(() => {
        dispatch(getFriendsThunk());
    },[])
    useEffect(() => {
        socket.on('connect', () => setIsConnected(true))
        socket.on('disconnect', () => setIsConnected(false))

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        }; 

    }, [id]);
    useEffect(() => {
        socket.on('newPrivateMessage', (payload: NewPrivateMessageResponse) => {
            console.log('Message Received');
            /* const { chat, message } = payload;
            dispatch(newPrivateMessage(message));     
            dispatch(updateChat(chat));     */
        });
        return () => {
            socket.off('newPrivateMessage');
        }; 
    }, [id]);
    return (
        <>
            <ChatSideBar />
            {!id && <LandingPage />}
            <Outlet />
        </>
    )
}

export default ChatPage