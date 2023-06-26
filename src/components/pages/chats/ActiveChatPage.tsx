import { useContext, useEffect } from 'react'
import { ActiveChatPageStyle } from '../../../utils/styles'
import MessagePanel from '../messages/MessagePanel'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../utils/store'
import { getPrivateMessagesThunk } from '../../../utils/store/messages/privateMessageThunk'
import { SocketContext } from '../../../utils/context/SocketContext'

const ActiveChatPage = () => {
    const socket = useContext(SocketContext);
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getPrivateMessagesThunk(parseInt(id!)));
    },[id])
    useEffect(() => {
        socket.emit('newChatConnection', { id });
        return () => {
            socket.emit('newChatDisconnect', { id });
        };
    }, [id]);
    return (
        <ActiveChatPageStyle>
            <MessagePanel />
        </ActiveChatPageStyle>
    )
}

export default ActiveChatPage