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
import { updateChat } from '../../../utils/store/chats/chatSlice'

const MessagePanel = () => {
    const { id:chatId } = useParams();
    const { user } = useContext(AuthContext);
    const currentChat = useSelector((state:RootState) => state.chat.chats.find((chat) => chat.id === parseInt(chatId!)));
    const recipient = (user && currentChat && getChatRecipient(currentChat!,user));
    const messages = useSelector((state:RootState) => state.privateMessage.messages);
    const [content, setContent] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleMessageSend = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = parseInt(chatId!);
        if(!content || !id) return;
        dispatch(postPrivateMessageThunk({id,messageContent:content})).unwrap().then(({ data }) => {
            dispatch(updateChat(data.chat));
            setContent('');
		}).catch((err) => console.log(err));
    }
    return (
        <MessagePanelStyle>
            {recipient && <MessagePanelHeader user={recipient}/>}
            <MessageContainer messages={messages} />
            <MessageInputContainer handleMessageSend={handleMessageSend} messageTo={recipient?.firstName} content={content} setContent={setContent}/>
        </MessagePanelStyle>
    )
}

export default MessagePanel