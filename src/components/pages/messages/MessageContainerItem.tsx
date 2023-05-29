import { FC, useContext } from "react";
import { GroupMessage, PrivateMessage } from "../../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { AuthContext } from "../../../utils/context/AuthContext";
import { EditMessageContainer } from "./EditMessageContainer";
import { MessageWrapperStyle } from "../../../utils/styles";
import SentMessageContainer from "./SentMessageContainer";
import ReceivedMessageContainer from "./ReceivedMessageContainer";
import recipientAvatar from '../../../assets/sampleUser.jpg';
import yourAvatar from '../../../assets/testPFP.png';

type Props = {
    message: PrivateMessage | GroupMessage;
    onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const MessageContainerItem:FC<Props> = ({message,onEditMessageChange}) => {
    const { isEditing, editingMessage } = useSelector((state: RootState) => state.privateMessage);
    const { user } = useContext(AuthContext);
    return (
        <>
            {user && message.author.id === user.id ? (
                <MessageWrapperStyle key={message.id} >
                    <img src={yourAvatar} />
                    {isEditing && message.id === editingMessage?.id ? (
                        <EditMessageContainer onEditMessageChange={onEditMessageChange} />
                    ) : <SentMessageContainer message={message} />}
                </MessageWrapperStyle>
            ) : (
                <MessageWrapperStyle>
                    <img src={recipientAvatar} />
                    <ReceivedMessageContainer message={message} key={JSON.stringify(message.id)} />
                </MessageWrapperStyle>
            )} 
        </>
    )
}