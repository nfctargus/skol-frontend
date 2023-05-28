import { useEffect } from 'react'
import { ActiveChatPageStyle } from '../../utils/styles'
import MessagePanel from './messages/MessagePanel'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../utils/store'
import { getPrivateMessagesThunk } from '../../utils/store/messages/privateMessageThunk'

const ActiveChatPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getPrivateMessagesThunk(parseInt(id!)));
    },[id])
    return (
        <ActiveChatPageStyle>
            <MessagePanel />
        </ActiveChatPageStyle>
    )
}

export default ActiveChatPage