import React, { useEffect, useState } from 'react'
import './style.sidebar.scss'
import Logo from '../../assets/image/logo.png'
import { BiGridAlt } from 'react-icons/bi'
import { BsFillPersonFill } from 'react-icons/bs'
import { HiOutlineNewspaper } from 'react-icons/hi'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { ImStatsDots } from 'react-icons/im'
import { AiOutlineKey, AiFillGift, AiOutlineQuestionCircle, AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { BiSolidLogIn } from 'react-icons/bi'
import { GoDotFill, GoDot } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelectorRoot } from '../../redux/store'
const Sidebar = () => {
    const { userRole } = useSelectorRoot((state) => state.login);
    const navigate = useNavigate();
    const [active, setActive] = useState<number>(1)
    const [subActive, setSubActive] = useState<number>(1)
    const [subActiveBook, setSubActiveBook] = useState<number>(1)
    const [subActiveUser, setSubActiveUser] = useState<number>(1)
    let isAdmin = false
    let isStaff = false
    if(userRole){
        if(userRole == "Admin"){
            isAdmin = true
        }
        if(userRole == "Staff"){
            isStaff = true
        }
    }

    useEffect(() => {
		if (window.location.pathname === "/management") setActive(1);
		if (window.location.pathname === "/management/book") setActive(2);
        if (window.location.pathname === "/management/author") setActive(3);
        if (window.location.pathname === "/management/publisher") setActive(4);
        if (window.location.pathname === "/management/category") setActive(5);
        if (window.location.pathname === "/management/orders") setActive(6);
        if (window.location.pathname === "/management/staff") setActive(7);
        if (window.location.pathname === "/management/user") setActive(8)
        if (window.location.pathname === "/management/history") setActive(9);
	}, []);

    return (
        <div className="main-sidebar">
            <div className="sidebar-logo">
                <img src={Logo} alt="" />
                <span>E-Book Management</span>
            </div>
            <div className="sidebar-menu">
                <div className={'sidebar-item' + (active === 1 ? ' active' : ' ')} onClick={() => {
                    setActive(1)
                    navigate('/management')
                }}>
                    <BiGridAlt />
                    <span>Tổng quan</span>
                </div>
                {isAdmin && (
                    <>
                    <div className={'sidebar-item' + (active === 2 ? ' active' : '')} onClick={() => {
                    setActive(2)
                    navigate('/management/book')
                    }}>
                        <BiGridAlt />
                        <span>Quản lý Sách</span>
                    </div>
                    {active === 2 &&
                    <motion.div className={'sub-sidebar'}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.3 }}
                    >
                        <div className={'sub-sidebar-item' + (subActiveBook === 1 ? ' active' : '')}
                            onClick={() => {
                                setSubActiveBook(1)
                                navigate('/management/book')
                            }}>
                            {subActiveBook === 1 ? <GoDotFill /> : <GoDot />}
                            <span>Sách đang bán</span>
                        </div>
                        <div className={'sub-sidebar-item' + (subActiveBook === 2 ? ' active' : '')}
                            onClick={() => {
                                setSubActiveBook(2)
                                navigate('/management/add-book')
                            }}>
                            {subActiveBook === 2 ? <GoDotFill /> : <GoDot />}
                            <span>Thêm mới sách</span>
                        </div>
                    </motion.div>
                    }
                    <div className={'sidebar-item' + (active === 3 ? ' active' : '')} onClick={() => {
                        setActive(3)
                        navigate('/management/author')
                    }}>
                        <BiGridAlt />
                        <span>Quản lý tác giả</span>
                    </div>
                    <div className={'sidebar-item' + (active === 4 ? ' active' : '')} onClick={() => {
                        setActive(4)
                        navigate('/management/publisher')
                    }}>
                        <BiGridAlt />
                        <span>Quản lý nhà xuất bản</span>
                    </div>
                    <div className={'sidebar-item' + (active === 5 ? ' active' : '')} onClick={() => {
                        setActive(5)
                        navigate('/management/category')
                    }}>
                        <BiGridAlt />
                        <span>Quản lý thể loại </span>
                    </div>
                    <div className={'sidebar-item' + (active === 6 ? ' active' : '')} onClick={() => {
                        setActive(6)
                        navigate('/management/orders')
                    }}>
                        <BiGridAlt />
                        <span>Quản lý đơn hàng</span>
                    </div>
                    <div className={'sidebar-item' + (active === 7 ? ' active' : '')} onClick={() => {
                        setActive(7)
                        navigate('/management/staff')
                    }}>
                        <BiGridAlt />
                        <span>Quản lý nhân viên</span>
                    </div>
                    <div className={'sidebar-item' + (active === 8 ? ' active' : '')} onClick={() => {
                        setActive(8)
                        navigate('/management/user-active')
                    }}>
                        <BiGridAlt />
                        <span>Quản lý người dùng</span>
                    </div>
                    {active === 8 &&
                    <motion.div className={'sub-sidebar'}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.3 }}
                    >
                        <div className={'sub-sidebar-item' + (subActiveUser === 1 ? ' active' : '')}
                            onClick={() => {
                                setSubActiveUser(1)
                                navigate('/management/user-active')
                            }}>
                            {subActiveUser === 1 ? <GoDotFill /> : <GoDot />}
                            <span>Tài khoản hoạt động</span>
                        </div>
                        <div className={'sub-sidebar-item' + (subActiveUser === 2 ? ' active' : '')}
                            onClick={() => {
                                setSubActiveUser(2)
                                navigate('/management/user-block')
                            }}>
                            {subActiveUser === 2 ? <GoDotFill /> : <GoDot />}
                            <span>Tài khoản bị chặn</span>
                        </div>
                    </motion.div>
                    }
                    <div className={'sidebar-item' + (active === 9 ? ' active' : '')} onClick={() => {
                        setActive(9)
                        navigate('/management/history')
                    }}>
                        <BiGridAlt />
                        <span>Lịch sử</span>
                    </div>
                    </>
                )}
                {isStaff && (
                    <>
                    <div className={'sidebar-item' + (active === 2 ? ' active' : '')} onClick={() => {
                    setActive(2)
                    navigate('/management/book')
                    }}>
                        <BiGridAlt />
                        <span>Quản lý Sách</span>
                    </div>
                    {active === 2 &&
                    <motion.div className={'sub-sidebar'}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.3 }}
                    >
                        <div className={'sub-sidebar-item' + (subActiveBook === 1 ? ' active' : '')}
                            onClick={() => {
                                setSubActiveBook(1)
                                navigate('/management/book')
                            }}>
                            {subActiveBook === 1 ? <GoDotFill /> : <GoDot />}
                            <span>Sách đang bán</span>
                        </div>
                        <div className={'sub-sidebar-item' + (subActiveBook === 2 ? ' active' : '')}
                            onClick={() => {
                                setSubActiveBook(2)
                                navigate('/management/add-book')
                            }}>
                            {subActiveBook === 2 ? <GoDotFill /> : <GoDot />}
                            <span>Thêm mới sách</span>
                        </div>
                    </motion.div>
                    }
                                        <div className={'sidebar-item' + (active === 3 ? ' active' : '')} onClick={() => {
                        setActive(3)
                        navigate('/management/author')
                    }}>
                        <BiGridAlt />
                        <span>Quản lý tác giả</span>
                    </div>
                    <div className={'sidebar-item' + (active === 4 ? ' active' : '')} onClick={() => {
                        setActive(4)
                        navigate('/management/publisher')
                    }}>
                        <BiGridAlt />
                        <span>Quản lý nhà xuất bản</span>
                    </div>
                    <div className={'sidebar-item' + (active === 5 ? ' active' : '')} onClick={() => {
                        setActive(5)
                        navigate('/management/category')
                    }}>
                        <BiGridAlt />
                        <span>Quản lý thể loại </span>
                    </div>
                    <div className={'sidebar-item' + (active === 6 ? ' active' : '')} onClick={() => {
                        setActive(6)
                        navigate('/management/orders')
                    }}>
                        <BiGridAlt />
                        <span>Quản lý đơn hàng</span>
                    </div>
                    <div className={'sidebar-item' + (active === 8 ? ' active' : '')} onClick={() => {
                        setActive(8)
                        navigate('/management/user-active')
                    }}>
                        <BiGridAlt />
                        <span>Quản lý người dùng</span>
                    </div>
                    {active === 8 &&
                    <motion.div className={'sub-sidebar'}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.3 }}
                    >
                        <div className={'sub-sidebar-item' + (subActiveUser === 1 ? ' active' : '')}
                            onClick={() => {
                                setSubActiveUser(1)
                                navigate('/management/user-active')
                            }}>
                            {subActiveUser === 1 ? <GoDotFill /> : <GoDot />}
                            <span>Tài khoản hoạt động</span>
                        </div>
                        <div className={'sub-sidebar-item' + (subActiveUser === 2 ? ' active' : '')}
                            onClick={() => {
                                setSubActiveUser(2)
                                navigate('/management/user-block')
                            }}>
                            {subActiveUser === 2 ? <GoDotFill /> : <GoDot />}
                            <span>Tài khoản bị chặn</span>
                        </div>
                    </motion.div>
                    }
                    </>
                )}
            </div>
        </div >
    )
}

export default Sidebar