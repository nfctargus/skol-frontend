import { useEffect,useContext } from 'react'
import ChatSideBar from '../../sidebars/ChatSideBar'
import { Outlet, useParams } from 'react-router-dom'
import LandingPage from '../LandingPage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../utils/store';
import { getFriendsThunk } from '../../../utils/store/friends/friendThunk';
import { SocketContext } from '../../../utils/context/SocketContext';
import { newPrivateMessage,deletePrivateMessage,editPrivateMessage } from '../../../utils/store/messages/privateMessageSlice';
import { CreateGroupMessageResponse, NewPrivateMessageResponse } from '../../../utils/types';
import { updateChat }  from '../../../utils/store/chats/chatSlice';
import { AuthContext } from '../../../utils/context/AuthContext';
import { updateGroupChat } from '../../../utils/store/group-chats/groupChatSlice';
import { deleteGroupMessage, editGroupMessage, newGroupMessage } from '../../../utils/store/group-messages/groupMessageSlice';

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
        socket.on("groupMessageReceived", (data:CreateGroupMessageResponse) => {
            dispatch(updateGroupChat(data.chat));
            dispatch(newGroupMessage(data.message));
        })
        socket.on("messageDeleted", (data) => {
            dispatch(deletePrivateMessage(data.messageId));
        })
        socket.on("messageEdited", (data) => {
            dispatch(editPrivateMessage(data));
            dispatch(updateChat(data.chat));
        })
        socket.on("groupMessageDeleted", (data) => {
            dispatch(deleteGroupMessage(data.messageId));
        })
        socket.on("groupMessageEdited", (data) => {
            dispatch(editGroupMessage(data));
            dispatch(updateGroupChat(data.groupChat));
        })
        socket.on("userConnected", (data) => {
            //console.log(data);
            //Online users
            console.log("A new user has connected")
        })

        return () => {
            socket.off("messageReceived");
            socket.off('userConnected');
            socket.off('messageDeleted');
            socket.off('messageEdited');
            socket.off('groupMessageReceived');
            socket.off('groupMessageDeleted');
            socket.off('groupMessageEdited');
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