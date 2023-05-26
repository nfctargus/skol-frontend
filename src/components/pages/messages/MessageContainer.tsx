import React, { FC, useEffect, useState } from 'react'
import { MessageContainerStyle, MessageWrapperStyle } from '../../../utils/styles'
import ReceivedMessageContainer from './ReceivedMessageContainer'
import SentMessageContainer from './SentMessageContainer'
import recipientAvatar from '../../../assets/sampleUser.jpg';
import yourAvatar from '../../../assets/testPFP.png';
import { SelectedMessageContextMenu } from '../../context-menus/SelectedMessageContextMenu';
import { PrivateMessage } from '../../../utils/types';
type Props = {
    messages?:PrivateMessage[];
}
const MessageContainer:FC<Props> = ({messages}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [points, setPoints] = useState({ x: 0, y: 0 });
    
    const onContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        setShowMenu(true);
        setPoints({ x: e.pageX, y: e.pageY });
    };
    useEffect(() => {
        const handleClick = () => setShowMenu(false);
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

  return (
    <MessageContainerStyle>
        {messages && messages.map((message) => (
            <>
                <MessageWrapperStyle onContextMenu={(e) => onContextMenu(e)}>
                    <img src={recipientAvatar} />
                    <ReceivedMessageContainer messageContent={message.messageContent} timeStamp={message.createdAt}/>
                </MessageWrapperStyle>
                {/* <MessageWrapperStyle onContextMenu={(e) => onContextMenu(e)}>
                    <SentMessageContainer />
                    <img src={yourAvatar} />
                </MessageWrapperStyle> */}
            </>
        ))}
        
        
        {showMenu && <SelectedMessageContextMenu points={points} />}
    </MessageContainerStyle>
  )
}

export default MessageContainer