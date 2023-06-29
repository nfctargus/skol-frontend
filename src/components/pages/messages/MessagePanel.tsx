import { MessagePanelStyle } from '../../../utils/styles'
import MessageContainer from './MessageContainer'
import MessageInputContainer from './MessageInputContainer'
import MessagePanelHeader from '../partials/MessagePanelHeader'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../utils/store'
import { useParams } from 'react-router-dom'
import { getChatRecipient } from '../../../utils/helpers'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../utils/context/AuthContext'
import { postPrivateMessageThunk } from '../../../utils/store/messages/privateMessageThunk'
import { selectChatById, updateChat } from '../../../utils/store/chats/chatSlice'
import { SocketContext } from '../../../utils/context/SocketContext'

const MessagePanel = () => {
    const { id:chatId } = useParams();
    const { user } = useContext(AuthContext);
    const currentChat = useSelector((state:RootState) => selectChatById(state,parseInt(chatId!)));
    const recipient = getChatRecipient(currentChat!,user);
    const messages = useSelector((state:RootState) => state.privateMessage.messages);
    const [content, setContent] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const socket = useContext(SocketContext);

    const handleMessageSend = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = parseInt(chatId!);
        if(!content || !id) return;
        dispatch(postPrivateMessageThunk({id,messageContent:content})).unwrap().then(({ data }) => {
            dispatch(updateChat(data.chat));
            socket.emit("newPrivateMessage", {  
                message:data.message,
                chat:data.chat,
                recipientId:recipient!.id
            });
            setContent('');
		}).catch((err) => console.log(err));
    }
    return (
        <MessagePanelStyle>
            {recipient && <MessagePanelHeader /* user={recipient} *//>}
            <MessageContainer messages={messages} />
            <MessageInputContainer handleMessageSend={handleMessageSend} messageTo={recipient?.firstName} content={content} setContent={setContent}/>
        </MessagePanelStyle>
    )
}

export default MessagePanel