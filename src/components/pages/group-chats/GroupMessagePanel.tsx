import React, { useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../../../utils/store';
import { MessagePanelStyle } from '../../../utils/styles';
import MessageInputContainer from '../messages/MessageInputContainer';
import GroupMessageContainer from './GroupMessageContainer';
import GroupMessagePanelHeader from '../partials/GroupMessagePanelHeader';
import { postGroupMessageThunk } from '../../../utils/store/group-messages/groupMessageThunk';
import { getGroupMembers } from '../../../utils/helpers';
import { SocketContext } from '../../../utils/context/SocketContext';

const GroupMessagePanel = () => {
    const { id:groupId } = useParams();
    const currentChat = useSelector((state:RootState) => state.groupChat.groupChats.find((groupChat) => groupChat.id === parseInt(groupId!)));
    const messages = useSelector((state:RootState) => state.groupMessage.groupMessages);
    const [content, setContent] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const groupName = currentChat?.name ? currentChat.name : getGroupMembers(currentChat)
    const socket = useContext(SocketContext);
    
    const handleMessageSend = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = parseInt(groupId!);
        if(!content || !id) return;
        return dispatch(postGroupMessageThunk({id,messageContent:content})).unwrap().then(({ data }) => {
            socket.emit("newGroupMessage", {  
                chat:data.chat,
                message:data.message
            });
            setContent('');
		}).catch((err) => console.log(err));
    };
    return (
        <MessagePanelStyle>
            <GroupMessagePanelHeader group={currentChat}/>
            <GroupMessageContainer messages={messages} />
            <MessageInputContainer handleMessageSend={handleMessageSend} messageTo={groupName} content={content} setContent={setContent}/>
        </MessagePanelStyle>
    )
};

export default GroupMessagePanel