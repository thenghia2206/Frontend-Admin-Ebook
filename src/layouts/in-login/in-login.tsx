import React from 'react'
import Header from '../../components/header/header'
import Sidebar from '../../components/sidebar/sidebar'
import './in-login.styles.scss'
import { Router, Routes, Route, Outlet } from 'react-router-dom'
import OutLoginLayout from '../out-login/out-login'
import General from '../../pages/general/general'


type Props = {
    children?: React.ReactNode
}

const InLoginLayout = ({ children }: Props) => {
    return (
        <div className="main-home">
            <Sidebar />
            <Header />
            <div className='main-content'>
                <Outlet />
            </div>
        </div>
    )
}

export default InLoginLayout