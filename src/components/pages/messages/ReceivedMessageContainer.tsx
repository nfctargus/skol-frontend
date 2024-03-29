import { FC } from 'react'
import { ReceivedMessageContainerStyle } from '../../../utils/styles'
import { GroupMessage, PrivateMessage } from '../../../utils/types'
import styles from './index.module.scss';
import { formatRelative } from 'date-fns';

type Props = {
    message:PrivateMessage | GroupMessage;
}
const ReceivedMessageContainer:FC<Props> = ({message}) => {
    return (
        <>
            {message && message.author? (
                <div className={styles.messageContainerStyle}>
                <div className={styles.messageSenderContainerStyle}>
                    <h3>{message.author.firstName}</h3>
                    <small>{formatRelative(new Date(message.createdAt), new Date())}</small>
                </div>
                <ReceivedMessageContainerStyle key={JSON.stringify(message.id)}>
                    {message.messageContent}
                </ReceivedMessageContainerStyle>
            </div>
            ):<>Failed to load message...</>}
        </>
    )
}

export default ReceivedMessageContainer