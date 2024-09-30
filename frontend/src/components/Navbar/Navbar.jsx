import './Navbar.css'
import apiRequest from '@/services/apiRequest'
import Link from "next/link";
import LeftNav from "./LeftNav";

async function Navbar() {
    const res = await apiRequest.get('menus');
    const allMenus = res.data

    return (
        <div className="main-header">
            <div className="container-fluid">
                <div className="main-header__content">
                    <div className="main-header__right">
                        <img src="/images/logo/Logo.png" style={{width:'100px'}} className="main-header__logo" alt="لوگوی دویفای" />

                        <ul className="main-header__menu">
                            <li className="main-header__item">
                                <a href="#" className="main-header__link">صفحه اصلی</a>
                            </li>
                            {allMenus.map(menu => (
                                <li key={menu.id} className="main-header__item">
                                    <Link href={`/category/${menu.slug}`} className="main-header__link">{menu.title}
                                        {/*{menu.submenus.length !== 0 && (*/}
                                        {/*    <>*/}
                                        {/*        <i className="fas fa-angle-down main-header__link-icon"></i>*/}
                                        {/*        <ul className="main-header__dropdown">*/}
                                        {/*            {menu.submenus.map(submenu => (*/}
                                        {/*                <li key={submenu.id} className="main-header__dropdown-item">*/}
                                        {/*                    <Link href={`/course-info/${submenu.slug}`} className="main-header__dropdown-link">{submenu.name}</Link>*/}
                                        {/*                </li>*/}
                                        {/*            ))}*/}
                                        {/*        </ul>*/}
                                        {/*    </>*/}
                                        {/*)}*/}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <LeftNav/>
                </div>
            </div>
        </div>
    )
}

export default Navbar