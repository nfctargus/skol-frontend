import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../../../utils/store';
import { MessagePanelStyle } from '../../../utils/styles';
import MessageInputContainer from '../messages/MessageInputContainer';
import GroupMessageContainer from './GroupMessageContainer';
import { formatGroupChatName } from '../../../utils/helpers';
import GroupMessagePanelHeader from '../partials/GroupMessagePanelHeader';
import { postGroupMessageThunk } from '../../../utils/store/group-messages/groupMessageThunk';
import { addGroupChat } from '../../../utils/store/group-chats/groupChatSlice';


const GroupMessagePanel = () => {
    const { id:groupId } = useParams();
    const currentChat = useSelector((state:RootState) => state.groupChat.groupChats.find((groupChat) => groupChat.id === parseInt(groupId!)));
    const messages = useSelector((state:RootState) => state.groupMessage.groupMessages);
    const [content, setContent] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleMessageSend = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = parseInt(groupId!);
        if(!content || !id) return;
        return dispatch(postGroupMessageThunk({id,messageContent:content})).unwrap().then(({ data }) => {
            addGroupChat(data.chat);
            setContent('');
		}).catch((err) => console.log(err));
    }
    const groupName = formatGroupChatName(40,currentChat);
    return (
        <MessagePanelStyle>
            <GroupMessagePanelHeader groupName={groupName || "Group Chat"}/>
            <GroupMessageContainer messages={messages} />
            <MessageInputContainer handleMessageSend={handleMessageSend} messageTo={currentChat?.name} content={content} setContent={setContent}/>
        </MessagePanelStyle>
    )
}

export default GroupMessagePanel