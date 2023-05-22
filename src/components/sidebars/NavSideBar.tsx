import React from 'react'
import { CurrentUserAvatarStyle, NavSideBarStyle, SideBarDivider } from '../../utils/styles'
import avatar from '../../assets/testPFP.png';
import { PanelSplit, ChatDots, Gear, Door } from 'akar-icons';
import styles from './index.module.scss';

const NavSideBar = () => {
    const ICON_SIZE = 32;
    const ICON_STROKE = 1;
    return (
        <>
        <NavSideBarStyle>
            <div className={styles.profilePicContainer}>
                <CurrentUserAvatarStyle src={avatar}/>
                <SideBarDivider />
            </div>
            
            <div className={styles.navIconBar}>
                <PanelSplit size={ICON_SIZE} strokeWidth={ICON_STROKE} />
                <ChatDots size={ICON_SIZE} strokeWidth={ICON_STROKE} />
                <Gear size={ICON_SIZE} strokeWidth={ICON_STROKE}/>
                <Door size={ICON_SIZE} strokeWidth={ICON_STROKE}/>
            </div>
        </NavSideBarStyle>
        </>
    )
}

export default NavSideBar