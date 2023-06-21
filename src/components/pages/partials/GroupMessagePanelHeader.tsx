import { FC } from "react";
import styles from './index.module.scss';
import { MessagePanelHeaderStyle } from "../../../utils/styles";
import { GroupChat } from "../../../utils/types";
import { getGroupMembers, returnGroupTitle } from "../../../utils/helpers";
type Props = {
    group?:GroupChat;
}
const GroupMessagePanelHeader:FC<Props> = ({group}) => {
    const groupName = group?.name ? group.name : getGroupMembers(group)
    return (
        <MessagePanelHeaderStyle>
            <div className={styles.groupAvatarContainer}>
                <img src={`../images/${group?.avatar}`} alt={returnGroupTitle(group)}/>
            </div>
            <div className={styles.messagePanelUserInfo}>
                <h1>{group && groupName!}</h1>
            </div>
        </MessagePanelHeaderStyle>
    )
}

export default GroupMessagePanelHeader