import { MessagePanelStyle } from '../../../utils/styles'
import MessageContainer from './MessageContainer'
import MessageInputContainer from './MessageInputContainer'
import MessagePanelHeader from '../partials/MessagePanelHeader'

const MessagePanel = () => {
    return (
        <MessagePanelStyle>
            <MessagePanelHeader />
            <MessageContainer />
            <MessageInputContainer />
        </MessagePanelStyle>
    )
}

export default MessagePanel