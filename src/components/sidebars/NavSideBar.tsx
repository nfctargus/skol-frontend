import React, { useContext, useEffect, useState } from 'react'
import { ChatUserDefaultAvatarStyle, CurrentUserAvatarStyle, NavSideBarStyle, SideBarDivider } from '../../utils/styles'
import { Gear, Person, Plus, SignOut, TrashCan  } from 'akar-icons';
import styles from './index.module.scss';
import { postLogoutUser } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { getGroupChatsThunk } from '../../utils/store/group-chats/groupChatThunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../utils/store';
import { getUserInitials, hasProfilePicture, returnGroupTitle, returnProfilePic } from '../../utils/helpers';
import CreateChatModal from '../modals/CreateChatModal';
import { AuthContext } from '../../utils/context/AuthContext';
import EditGroupChatContextMenu from '../context-menus/EditGroupChatContextMenu';

const NavSideBar = () => {
    const [showCreateChatModal, setShowCreateChatModal] = useState(false);
    const [showGroupActionsMenu, setShowGroupActionsMenu] = useState(false);
    const [currentGroupChat,setCurrentGroupChat] = useState(0);
    const [points, setPoints] = useState({ x: 0, y: 0 });
    const { user } = useContext(AuthContext);
    const ICON_SIZE = 32;
    const ICON_STROKE = 1;
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const groupChats = useSelector((state:RootState) => state.groupChat.groupChats);

    const onContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,id:number) => {
        e.preventDefault();
        setPoints({ x: e.pageX, y: e.pageY });
        setCurrentGroupChat(id);
        setShowGroupActionsMenu(true);
    };

    useEffect(() => {
        dispatch(getGroupChatsThunk());
    },[]);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setShowGroupActionsMenu(false);
        window.addEventListener('keydown',handleKeyDown)
        return () => {
            window.removeEventListener('keydown',handleKeyDown);
        }
    }, []);
    
    const logoutUser = () => {
        postLogoutUser().finally(() => navigate('/login'));
    };
    const navigateProfilePage = () => {
        navigate('/profile');
    }
    return (
        <>
            {showCreateChatModal && <CreateChatModal setShowCreateChatModal={setShowCreateChatModal}/>}
            {showGroupActionsMenu && <EditGroupChatContextMenu points={points} id={currentGroupChat} setShowGroupActionsMenu={setShowGroupActionsMenu}/>}
            <NavSideBarStyle>
                <div className={styles.profilePicContainer}>
                    {user && hasProfilePicture(user) ? returnProfilePic(user) : <ChatUserDefaultAvatarStyle>{getUserInitials(user!)}</ChatUserDefaultAvatarStyle>}
                    <SideBarDivider />
                </div>
                <div className={styles.groupIcons}>
                    {groupChats && groupChats.map((groupChat) => (
                        <div key={groupChat.id} onClick={() => navigate(`/groups/${groupChat.id}`)} onContextMenu={(e) => onContextMenu(e,groupChat.id)}>
                            {groupChat.avatar ? <img src={`../images/${groupChat.avatar}`} alt={returnGroupTitle(groupChat)}/> : returnGroupTitle(groupChat)}
                        </div>
                    ))}
                    <div onClick={() => setShowCreateChatModal(!showCreateChatModal)}><Plus size={ICON_SIZE -4} strokeWidth={2} /></div> 
                </div>
                <div className={styles.navIconBar}>
                    <input type="checkbox" id={styles.toggleOptions} /> 
                    <div className={styles.settingsOptions}>
                        <div className={styles.settingsIcons}><SignOut size={ICON_SIZE} strokeWidth={ICON_STROKE} onClick={logoutUser}/></div>
                        <div className={styles.settingsIcons}><TrashCan size={ICON_SIZE} strokeWidth={ICON_STROKE}/></div>
                        <div className={styles.settingsIcons}><Person size={ICON_SIZE} strokeWidth={ICON_STROKE} onClick={navigateProfilePage}/></div>
                    </div>
                    <label className={styles.navIcons} htmlFor={styles.toggleOptions}><Gear size={ICON_SIZE} strokeWidth={ICON_STROKE}/></label>            
                </div>
            </NavSideBarStyle>
        </>
        
    )
}

export default NavSideBar