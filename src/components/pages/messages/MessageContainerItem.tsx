import { FC, useContext } from "react";
import { PrivateMessage } from "../../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { AuthContext } from "../../../utils/context/AuthContext";
import { EditMessageContainer } from "./EditMessageContainer";
import { MessageWrapperStyle } from "../../../utils/styles";
import SentMessageContainer from "./SentMessageContainer";
import ReceivedMessageContainer from "./ReceivedMessageContainer";

import { returnProfilePic } from "../../../utils/helpers";

type Props = {
    message: PrivateMessage;
    onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const MessageContainerItem:FC<Props> = ({message,onEditMessageChange}) => {
    const { isEditing, editingMessage } = useSelector((state: RootState) => state.privateMessage);
    const { user } = useContext(AuthContext);
    
    return (
        <>
            {user && message.author.id === user.id ? (
                <MessageWrapperStyle key={message.id}>
                    {returnProfilePic(message.author)}
                    {isEditing && message.id === editingMessage?.id ? (
                        <EditMessageContainer onEditMessageChange={onEditMessageChange} />
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