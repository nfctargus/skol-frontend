import React from 'react'
import { MessageInputContainerStyle, MessageInputField } from '../../../utils/styles'

const MessageInputContainer = () => {
  return (
    <MessageInputContainerStyle>
        <MessageInputField placeholder='Type a message...' />
    </MessageInputContainerStyle>
  )
}

export default MessageInputContainer