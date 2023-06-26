import { useEffect,useContext, useState } from 'react'
import ChatSideBar from '../../sidebars/ChatSideBar'
import { Outlet, useParams } from 'react-router-dom'
import LandingPage from '../LandingPage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../utils/store';
import { getFriendsThunk } from '../../../utils/store/friends/friendThunk';
import { SocketContext } from '../../../utils/context/SocketContext';
import { newPrivateMessage } from '../../../utils/store/messages/privateMessageSlice';
import { NewPrivateMessageResponse, PrivateMessage } from '../../../utils/types';
import { updateChat }  from '../../../utils/store/chats/chatSlice';
import { AuthContext } from '../../../utils/context/AuthContext';

const ChatPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const socket = useContext(SocketContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        dispatch(getFriendsThunk());
    },[])
    useEffect(() => {
        socket.auth = { user }
        socket.connect();

        return () => {
            socket.disconnect();
        };
    },[])

    useEffect(() => {
        socket.on("messageReceived", ({message,chat}:NewPrivateMessageResponse) => {
            dispatch(newPrivateMessage(message));
            dispatch(updateChat(chat));
        })
        socket.on("userConnected", (data) => {
            //console.log(data);
            //Online users
            console.log("A new user has connected")
        })

        return () => {
            socket.off("messageReceived");
            socket.off('userConnected');
        }; 

    }, []);
    return (
        <>
            <ChatSideBar />
            {!id && <LandingPage />}
            <Outlet />
        </>
    )
}

export default ChatPage