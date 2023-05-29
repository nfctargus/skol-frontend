import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../../utils/store';
import { ActiveChatPageStyle } from '../../../utils/styles';
import { getGroupMessagesThunk } from '../../../utils/store/group-messages/groupMessageThunk';
import GroupMessagePanel from './GroupMessagePanel';

const ActiveGroupChatPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getGroupMessagesThunk(parseInt(id!)));
    },[id])

    return (
        <ActiveChatPageStyle>
            <GroupMessagePanel />
        </ActiveChatPageStyle>
    )
}

export default ActiveGroupChatPage