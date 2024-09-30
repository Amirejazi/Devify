'use client'

import Link from "next/link";
import {useAuth} from "@/contexts/AuthContext";

const LeftNav = () => {
    const {isLoggedIn, userInfos} = useAuth()
    return (
        <div className="main-header__left">
            <a href="#" className="main-header__search-btn">
                <i className="fas fa-search main-header__search-icon"></i>
            </a>
            <a href="#" className="main-header__cart-btn">
                <i className="fas fa-shopping-cart main-header__cart-icon"></i>
            </a>
            {isLoggedIn && userInfos ?
                (<Link className="main-header__profile" href={'#'}>
                    <span className="main-header__profile-text">{userInfos.name}</span>
                </Link>) :
                (<Link className="main-header__profile" href={'/login'}>
                    <span className="main-header__profile-text">ثبت‌نام / ورود</span>
                </Link>)}
        </div>
    );
};

export default LeftNav;