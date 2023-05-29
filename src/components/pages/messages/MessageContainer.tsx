import React, { FC, useEffect, useState } from 'react'
import { MessageContainerStyle } from '../../../utils/styles'
import { SelectedMessageContextMenu } from '../../context-menus/SelectedMessageContextMenu';
import { PrivateMessage } from '../../../utils/types';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../utils/store';
import { editMessageContent, resetEditingContainer, setIsEditing, setSelectedMessage } from '../../../utils/store/messages/privateMessageSlice';
import { MessageContainerItem } from './MessageContainerItem';

type Props = {
    messages?:PrivateMessage[];
}
const MessageContainer:FC<Props> = ({messages}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [showMenu, setShowMenu] = useState(false);
    const { id } = useParams();
    const [points, setPoints] = useState({ x: 0, y: 0 });

    const onContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,message:PrivateMessage) => {
        e.preventDefault();
        setShowMenu(true);
        dispatch(setSelectedMessage(message));
        setPoints({ x: e.pageX, y: e.pageY });
    };
    useEffect(() => {
        const handleClick = () => setShowMenu(false);
        const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && dispatch(setIsEditing(false));
        window.addEventListener('click', handleClick);
        window.addEventListener('keydown',handleKeyDown)
        return () => {
            window.removeEventListener('click', handleClick);
            window.removeEventListener('keydown',handleKeyDown);
        }
    }, []);
    const onEditMessageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editMessageContent(e.target.value));
    }
    
    useEffect(() => {
        dispatch(resetEditingContainer());
    },[id])
    return (
        <MessageContainerStyle>
            {messages && messages.map((message) => (
                <div key={JSON.stringify(message?.id)} onContextMenu={(e) => onContextMenu(e,message)}>
                    <MessageContainerItem message={message} onEditMessageChange={onEditMessageChange} />
                </div>
            ))}
            {showMenu && <SelectedMessageContextMenu points={points} />}
        </MessageContainerStyle>
    )
}

export default MessageContainer