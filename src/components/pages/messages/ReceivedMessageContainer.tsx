import React, { FC } from 'react'
import { ReceivedMessageContainerStyle } from '../../../utils/styles'

type Props = {
    messageContent:string;
    timeStamp:number;
}
const ReceivedMessageContainer:FC<Props> = ({messageContent,timeStamp}) => {
    return (
        <ReceivedMessageContainerStyle>
            {messageContent}
        </ReceivedMessageContainerStyle>
    )
}

export default ReceivedMessageContainer