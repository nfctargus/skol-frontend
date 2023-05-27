import React, { FC, useContext, useEffect, useState } from 'react'
import { MessageContainerStyle, MessageWrapperStyle } from '../../../utils/styles'
import ReceivedMessageContainer from './ReceivedMessageContainer'
import SentMessageContainer from './SentMessageContainer'
import recipientAvatar from '../../../assets/sampleUser.jpg';
import yourAvatar from '../../../assets/testPFP.png';
import { SelectedMessageContextMenu } from '../../context-menus/SelectedMessageContextMenu';
import { PrivateMessage } from '../../../utils/types';
import { AuthContext } from '../../../utils/context/AuthContext';
type Props = {
    messages:PrivateMessage[];
}
const MessageContainer:FC<Props> = ({messages}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [points, setPoints] = useState({ x: 0, y: 0 });
    const { user } = useContext(AuthContext);
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
                <div key={JSON.stringify(message?.id)}>
                    {user && message.author.id === user.id ? (
                        <MessageWrapperStyle onContextMenu={(e) => onContextMenu(e)}>
                            <img src={yourAvatar} />
                            <SentMessageContainer message={message} />
                        </MessageWrapperStyle>
                    ) : (
                        <MessageWrapperStyle onContextMenu={(e) => onContextMenu(e)}>
                            <img src={recipientAvatar} />
                            <ReceivedMessageContainer message={message} key={JSON.stringify(message.id)} />
                        </MessageWrapperStyle>
                    )} 
                </div>
            ))}
            {showMenu && <SelectedMessageContextMenu points={points} />}
        </MessageContainerStyle>
    )
}

export default MessageContainer