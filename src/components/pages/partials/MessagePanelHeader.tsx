import { useSelector } from 'react-redux';
import { hasProfilePicture, getUserInitials, formatUserPresence, getChatRecipient } from '../../../utils/helpers';
import { ChatUserAvatarContainer, ChatUserAvatarStyle, ChatUserDefaultAvatarStyle, MessagePanelHeaderStyle } from '../../../utils/styles'
import styles from './index.module.scss';
import { useContext } from 'react';
import { RootState } from '../../../utils/store';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../utils/context/AuthContext';
import { selectChatById } from '../../../utils/store/chats/chatSlice';


const MessagePanelHeader = () => {
    const { user } = useContext(AuthContext);
	const { id:chatId } = useParams();
    const currentChat = useSelector((state:RootState) => selectChatById(state,parseInt(chatId!)));
    const recipient = getChatRecipient(currentChat!,user);
    const formattedName = `${recipient?.firstName} ${recipient?.lastName}`;
    
    return (
        <MessagePanelHeaderStyle>
                <ChatUserAvatarContainer>
                    {hasProfilePicture(recipient) ? (<ChatUserAvatarStyle src={`../images/${recipient?.profile?.avatar}`}/>) 
                    : (<ChatUserDefaultAvatarStyle>{getUserInitials(recipient)}</ChatUserDefaultAvatarStyle>)}
                </ChatUserAvatarContainer>
                <div className={styles.messagePanelUserInfo}>
                    <h1>{formattedName}</h1>
                    {/* recipient.presence && formatUserPresence(recipient.presence) */}
                </div>
           
        </MessagePanelHeaderStyle>
    )
}
export default MessagePanelHeader