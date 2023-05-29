import { useSelector } from "react-redux";
import { RootState } from "../../../utils/store";
import { FC, useContext } from "react";
import { AuthContext } from "../../../utils/context/AuthContext";
import { GroupMessage } from "../../../utils/types";
import { MessageWrapperStyle } from "../../../utils/styles";
import SentMessageContainer from "../messages/SentMessageContainer";
import ReceivedMessageContainer from "../messages/ReceivedMessageContainer";
import recipientAvatar from '../../../assets/sampleUser.jpg';
import yourAvatar from '../../../assets/testPFP.png';
import { EditGroupMessageContainer } from "./EditGroupMessageContainer";


type Props = {
    message: GroupMessage;
    onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const GroupMessageContainerItem:FC<Props> = ({message,onEditMessageChange}) => {
    const { isEditingGroup, editingGroupMessage } = useSelector((state: RootState) => state.groupMessage);
    const { user } = useContext(AuthContext);
    return (
        <>
            {user && message.author.id === user.id ? (
                <MessageWrapperStyle key={message.id} >
                    <img src={yourAvatar} />
                    {isEditingGroup && message.id === editingGroupMessage?.id ? (
                        <EditGroupMessageContainer onEditMessageChange={onEditMessageChange} />
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

export default GroupMessageContainerItem