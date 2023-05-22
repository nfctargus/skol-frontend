import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppPageStyle } from '../utils/styles'
import NavSideBar from './sidebars/NavSideBar'

const AppPage = () => {
    return (
        <AppPageStyle>
            <NavSideBar />
            <Outlet />
        </AppPageStyle>
    )
}

export default AppPage