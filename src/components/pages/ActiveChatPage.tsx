import { useState } from 'react'
import { ActiveChatPageStyle } from '../../utils/styles'
import CurrentChatInfoPage from './CurrentChatInfoPage'
import MessagePanel from './messages/MessagePanel'

const ActiveChatPage = () => {
    const [showModal,setShowModal] = useState(true);
    return (
        <ActiveChatPageStyle>
            <MessagePanel />
            {showModal && <CurrentChatInfoPage/> } 
        </ActiveChatPageStyle>
    )
}

export default ActiveChatPage