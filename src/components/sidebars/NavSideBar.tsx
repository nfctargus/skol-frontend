import React, { useState } from 'react'
import { CurrentUserAvatarStyle, NavSideBarStyle, SideBarDivider } from '../../utils/styles'
import avatar from '../../assets/testPFP.png';
import { ChatDots, Gear, Door, PeopleMultiple  } from 'akar-icons';
import styles from './index.module.scss';
import FriendsModal from '../modals/FriendsModal';

const NavSideBar = () => {
    const [showFriendsModal, setShowFriendsModal] = useState(false);
    const ICON_SIZE = 32;
    const ICON_STROKE = 1;
    return (
        <>
        {showFriendsModal && <FriendsModal setShowFriendsModal={setShowFriendsModal}/>}
            <NavSideBarStyle>
                <div className={styles.profilePicContainer}>
                    <CurrentUserAvatarStyle src={avatar}/>
                    <SideBarDivider />
                </div>
                <div className={styles.navIconBar}>
                    <div className={styles.navIcons} onClick={() => setShowFriendsModal(!showFriendsModal)}><PeopleMultiple  size={ICON_SIZE} strokeWidth={ICON_STROKE} /></div>
                    <div className={styles.navIcons}><ChatDots size={ICON_SIZE} strokeWidth={ICON_STROKE} /></div>
                    <div className={styles.navIcons}><Gear size={ICON_SIZE} strokeWidth={ICON_STROKE}/></div>
                    <div className={styles.navIcons}><Door size={ICON_SIZE} strokeWidth={ICON_STROKE}/></div>
                </div>
            </NavSideBarStyle>
        </>
    )
}

export default NavSideBar