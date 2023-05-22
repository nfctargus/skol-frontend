import React from 'react'
import { ChatUserAvatarStyle, MessageContainerStyle, MessageWrapperStyle } from '../../../utils/styles'
import ReceivedMessageContainer from './ReceivedMessageContainer'
import SentMessageContainer from './SentMessageContainer'
import recipientAvatar from '../../../assets/sampleUser.jpg';
import yourAvatar from '../../../assets/testPFP.png';

const MessageContainer = () => {
  return (
    <MessageContainerStyle>
        <MessageWrapperStyle>
            <img src={recipientAvatar} />
            <ReceivedMessageContainer />
        </MessageWrapperStyle>
        <MessageWrapperStyle>
            <SentMessageContainer />
            <img src={yourAvatar} />
        </MessageWrapperStyle>
        
    </MessageContainerStyle>
  )
}

export default MessageContainer