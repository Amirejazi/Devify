import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import AuthContext from '../../context/authContext'
import { Link } from 'react-router-dom'
import apiRequests from '../../services/Axios/configs'

function Navbar() {
    const [allMenus, setAllMenus] = useState([])
    const authContext = useContext(AuthContext)

    useEffect(() => {
        apiRequests.get('menus')
            .then(res => setAllMenus(res.data))
    }, [])

    return (
        <div className="main-header">
            <div className="container-fluid">
                <div className="main-header__content">
                    <div className="main-header__right">
                        <img src="/images/logo/Logo.png" className="main-header__logo" alt="لوگوی سبزلرن" />

                        <ul className="main-header__menu">
                            <li className="main-header__item">
                                <a href="#" className="main-header__link">صفحه اصلی</a>
                            </li>
                            {allMenus.map(menu => (
                                <li key={menu.id} className="main-header__item">
                                    <Link to={`/category/${menu.slug}`} className="main-header__link">{menu.title}
                                        {menu.submenus.length !== 0 && (
                                            <>
                                                <i className="fas fa-angle-down main-header__link-icon"></i>
                                                <ul className="main-header__dropdown">
                                                    {menu.submenus.map(submenu => (
                                                        <li key={submenu.id} className="main-header__dropdown-item">
                                                            <Link to={`/course-info/${submenu.slug}`} className="main-header__dropdown-link">{submenu.name}</Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="main-header__left">
                        <a href="#" className="main-header__search-btn">
                            <i className="fas fa-search main-header__search-icon"></i>
                        </a>
                        <a href="#" className="main-header__cart-btn">
                            <i className="fas fa-shopping-cart main-header__cart-icon"></i>
                        </a>
                        {authContext.isLoggedIn && authContext.userInfos ?
                            (<Link className="main-header__profile">
                                <span className="main-header__profile-text">{authContext.userInfos.name}</span>
                            </Link>) :
                            (<Link className="main-header__profile">
                                <span className="main-header__profile-text">ثبت‌نام / ورود</span>
                            </Link>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar