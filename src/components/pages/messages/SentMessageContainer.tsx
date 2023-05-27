import { FC } from 'react'
import { SentMessageContainerStyle } from '../../../utils/styles'
import { PrivateMessage } from '../../../utils/types'
import styles from './index.module.scss';
import { formatRelative } from 'date-fns';

type Props = {
    message:PrivateMessage;
}
const SentMessageContainer:FC<Props> = ({message}) => {
    return (
        <div className={styles.messageContainerStyle}>
            <div className={styles.messageSenderContainerStyle}>
                <h3>You</h3>
                <small>{formatRelative(new Date(message.createdAt), new Date())}</small>
            </div>
            <SentMessageContainerStyle key={JSON.stringify(message.id)}>
                {message.messageContent}
            </SentMessageContainerStyle>
        </div>
    )
}

export default SentMessageContainer