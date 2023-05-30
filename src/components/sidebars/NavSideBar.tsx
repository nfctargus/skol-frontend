import React, { useEffect, useState } from 'react'
import { CurrentUserAvatarStyle, NavSideBarStyle, SideBarDivider } from '../../utils/styles'
import avatar from '../../assets/testPFP.png';
import { Gear, Person, Plus, SignOut, TrashCan  } from 'akar-icons';
import styles from './index.module.scss';
import FriendsModal from '../modals/FriendsModal';
import { postLogoutUser } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { getGroupChatsThunk } from '../../utils/store/group-chats/groupChatThunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../utils/store';
import { returnGroupTitle } from '../../utils/helpers';
import CreateChatModal from '../modals/CreateChatModal';

const NavSideBar = () => {
    const [showCreateChatModal, setShowCreateChatModal] = useState(false);
    const ICON_SIZE = 32;
    const ICON_STROKE = 1;
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const groupChats = useSelector((state:RootState) => state.groupChat.groupChats);
    useEffect(() => {
        dispatch(getGroupChatsThunk());
    },[]);
    
    const logoutUser = () => {
        postLogoutUser().finally(() => navigate('/login'));
    };
    return (
        <>
            {showCreateChatModal && <CreateChatModal setShowCreateChatModal={setShowCreateChatModal}/>}
            <NavSideBarStyle>
                <div className={styles.profilePicContainer}>
                    <CurrentUserAvatarStyle src={avatar} onClick={() => navigate('/chats')}/>
                    <SideBarDivider />
                </div>
                <div className={styles.groupIcons}>
                    {groupChats && groupChats.map((groupChat) => (
                        <div key={groupChat.id} onClick={() => navigate(`/groups/${groupChat.id}`)}>{returnGroupTitle(groupChat)}</div>
                    ))}
                    <div onClick={() => setShowCreateChatModal(!showCreateChatModal)}><Plus size={ICON_SIZE -4} strokeWidth={2} /></div> 
                </div>
                <div className={styles.navIconBar}>
                    <input type="checkbox" id={styles.toggleOptions} /> 
                    <div className={styles.settingsOptions}>
                        <div className={styles.settingsIcons}><SignOut size={ICON_SIZE} strokeWidth={ICON_STROKE} onClick={() => logoutUser()}/></div>
                        <div className={styles.settingsIcons}><TrashCan size={ICON_SIZE} strokeWidth={ICON_STROKE}/></div>
                        <div className={styles.settingsIcons}><Person size={ICON_SIZE} strokeWidth={ICON_STROKE}/></div>
                    </div>
                    <label className={styles.navIcons} htmlFor={styles.toggleOptions}><Gear size={ICON_SIZE} strokeWidth={ICON_STROKE}/></label>            
                </div>
            </NavSideBarStyle>
        </>
        
    )
}

export default NavSideBar