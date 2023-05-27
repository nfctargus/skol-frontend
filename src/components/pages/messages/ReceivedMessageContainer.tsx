import { FC } from 'react'
import { ReceivedMessageContainerStyle } from '../../../utils/styles'
import { PrivateMessage } from '../../../utils/types'
import styles from './index.module.scss';
import { formatRelative } from 'date-fns';

type Props = {
    message:PrivateMessage;
}
const ReceivedMessageContainer:FC<Props> = ({message}) => {
    return (
        <div className={styles.messageContainerStyle}>
            <div className={styles.messageSenderContainerStyle}>
                <h3>{message.author.firstName}</h3>
                <small>{formatRelative(new Date(message.createdAt), new Date())}</small>
            </div>
            <ReceivedMessageContainerStyle key={JSON.stringify(message.id)}>
                {message.messageContent}
            </ReceivedMessageContainerStyle>
        </div>
    )
}

export default ReceivedMessageContainer