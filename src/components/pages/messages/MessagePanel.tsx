import { MessagePanelStyle } from '../../../utils/styles'
import MessageContainer from './MessageContainer'
import MessageInputContainer from './MessageInputContainer'
import MessagePanelHeader from '../partials/MessagePanelHeader'

import { useSelector } from 'react-redux'
import { RootState } from '../../../utils/store'
import { useParams } from 'react-router-dom'
import { getChatRecipient } from '../../../utils/helpers'
import { useContext } from 'react'
import { AuthContext } from '../../../utils/context/AuthContext'

const MessagePanel = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const currentChat = useSelector((state:RootState) => state.chat.chats.find((chat) => chat.id === parseInt(id!)));
    console.log(currentChat)
    const recipient = getChatRecipient(currentChat!,user);
    return (
        <MessagePanelStyle>
            <MessagePanelHeader user={recipient}/>
            <MessageContainer messages={currentChat?.messages} />
            <MessageInputContainer />
        </MessagePanelStyle>
    )
}

export default MessagePanel