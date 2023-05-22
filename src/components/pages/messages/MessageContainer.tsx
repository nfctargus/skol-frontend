import React, { useEffect, useState } from 'react'
import { ChatUserAvatarStyle, MessageContainerStyle, MessageWrapperStyle } from '../../../utils/styles'
import ReceivedMessageContainer from './ReceivedMessageContainer'
import SentMessageContainer from './SentMessageContainer'
import recipientAvatar from '../../../assets/sampleUser.jpg';
import yourAvatar from '../../../assets/testPFP.png';
import { SelectedMessageContextMenu } from '../../context-menus/SelectedMessageContextMenu';

const MessageContainer = () => {
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
        <MessageWrapperStyle onContextMenu={(e) => onContextMenu(e)}>
            <img src={recipientAvatar} />
            <ReceivedMessageContainer />
        </MessageWrapperStyle>
        <MessageWrapperStyle onContextMenu={(e) => onContextMenu(e)}>
            <SentMessageContainer />
            <img src={yourAvatar} />
        </MessageWrapperStyle>
        
        {showMenu && <SelectedMessageContextMenu points={points} />}
    </MessageContainerStyle>
  )
}

export default MessageContainer