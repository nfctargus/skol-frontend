import { FC } from "react";
import styles from './index.module.scss';
import { MessagePanelHeaderStyle, ChatUserAvatarStyle } from "../../../utils/styles";
type Props = {
    groupName:string;
    groupAvatar?:string;
}
const GroupMessagePanelHeader:FC<Props> = ({groupName,groupAvatar}) => {
    return (
        <MessagePanelHeaderStyle>
                {groupAvatar ? <ChatUserAvatarStyle src={groupAvatar} /> : <div>No Avatar</div>}
                <div className={styles.messagePanelUserInfo}>
                    <h1>{groupName}</h1>
                </div>
        </MessagePanelHeaderStyle>
    )
}

export default GroupMessagePanelHeader