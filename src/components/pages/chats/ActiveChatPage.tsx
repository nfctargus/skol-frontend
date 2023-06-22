import { useContext, useEffect } from 'react'
import { ActiveChatPageStyle } from '../../../utils/styles'
import MessagePanel from '../messages/MessagePanel'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../utils/store'
import { getPrivateMessagesThunk } from '../../../utils/store/messages/privateMessageThunk'
import { SocketContext } from '../../../utils/context/SocketContext'
import { updateChat } from '../../../utils/store/chats/chatSlice'
import { newPrivateMessage } from '../../../utils/store/messages/privateMessageSlice'
import { NewPrivateMessageResponse } from '../../../utils/types'


const ActiveChatPage = () => {
    const socket = useContext(SocketContext);
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getPrivateMessagesThunk(parseInt(id!)));
    },[id])
    useEffect(() => {
        socket.emit('newChatConnection', { id });
       /*  socket.on('newPrivateMessage', (payload: NewPrivateMessageResponse) => {
            console.log('Message Received');
            const { chat, message } = payload;
            dispatch(newPrivateMessage(message));     
            dispatch(updateChat(chat));    
        });  */
        
        return () => {
            socket.emit('newChatDisconnect', { id });
            /* socket.off('newPrivateMessage'); */
        };
    }, [id]);
    return (
        <ActiveChatPageStyle>
            <MessagePanel />
        </ActiveChatPageStyle>
    )
}

export default ActiveChatPage