import { useEffect,useContext } from 'react'
import ChatSideBar from '../../sidebars/ChatSideBar'
import { Outlet, useParams } from 'react-router-dom'
import LandingPage from '../LandingPage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../utils/store';
import { getFriendsThunk } from '../../../utils/store/friends/friendThunk';
import { SocketContext } from '../../../utils/context/SocketContext';
import { newPrivateMessage,deletePrivateMessage,editPrivateMessage } from '../../../utils/store/messages/privateMessageSlice';
import { GroupChat, GroupMessage, NewPrivateMessageResponse } from '../../../utils/types';
import { updateChat }  from '../../../utils/store/chats/chatSlice';
import { AuthContext } from '../../../utils/context/AuthContext';
import { updateGroupChat } from '../../../utils/store/group-chats/groupChatSlice';
import { newGroupMessage } from '../../../utils/store/group-messages/groupMessageSlice';

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
        socket.on("groupMessageReceived", (data:GroupMessage) => {
            console.log(data)
            //dispatch(updateGroupChat(data.groupChat));
            dispatch(newGroupMessage(data));
        })
        socket.on("messageDeleted", (data) => {
            dispatch(deletePrivateMessage(data.messageId));
        })
        socket.on("messageEdited", (data) => {
            dispatch(editPrivateMessage(data));
            dispatch(updateChat(data.chat));
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