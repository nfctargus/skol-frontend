import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { FC, useContext } from "react";
import { AuthContext } from "../../../utils/context/AuthContext";
import { GroupMessage, User } from "../../../utils/types";
import { ChatUserAvatarContainer, ChatUserAvatarStyle, ChatUserDefaultAvatarStyle, MessageWrapperStyle } from "../../../utils/styles";
import SentMessageContainer from "../messages/SentMessageContainer";
import ReceivedMessageContainer from "../messages/ReceivedMessageContainer";
import { EditGroupMessageContainer } from "./EditGroupMessageContainer";
import { hasProfilePicture, getUserInitials } from "../../../utils/helpers";

type Props = {
    message: GroupMessage;
    onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const returnProfilePic = (user:User) => {
    return (
        <ChatUserAvatarContainer>
            {hasProfilePicture(user) ? (<ChatUserAvatarStyle src={`../images/${user?.profile?.avatar}`}/>) 
            : (<ChatUserDefaultAvatarStyle>{getUserInitials(user)}</ChatUserDefaultAvatarStyle>)}
        </ChatUserAvatarContainer>
    );
}

const GroupMessageContainerItem:FC<Props> = ({message,onEditMessageChange}) => {
    const { isEditingGroup, editingGroupMessage } = useSelector((state: RootState) => state.groupMessage);
    const { user } = useContext(AuthContext);
    return (
        <>
            {user && message.author.id === user.id ? (
                <MessageWrapperStyle key={message.id} >
                    {returnProfilePic(message.author)}
                    {isEditingGroup && message.id === editingGroupMessage?.id ? (
                        <EditGroupMessageContainer onEditMessageChange={onEditMessageChange} />
                    ) : <SentMessageContainer message={message} />}
                </MessageWrapperStyle>
            ) : (
                <MessageWrapperStyle>
                    {returnProfilePic(message.author)}
                    <ReceivedMessageContainer message={message} key={JSON.stringify(message.id)} />
                </MessageWrapperStyle>
            )} 
        </>
    )
}

export default GroupMessageContainerItem