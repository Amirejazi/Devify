import './Topbar.css'
import apiRequest from '@/services/apiRequest'
import Link from "next/link";

async function Topbar() {
    const res = await apiRequest.get('menus/topbar');
    const allTopbarLinks = res.data

    // const getRandomItems = (arr, count) => {
    //     const shuffled = [...arr].sort(() => 0.5 - Math.random());
    //     return shuffled.slice(0, count)
    // }

    return (
        <div className="top-bar">
            <div className="container-fluid">
                <div className="top-bar__content">
                    <div className="top-bar__right">
                        <ul className="top-bar__menu">
                            {allTopbarLinks.slice(0, 5).map(link => (
                                <li key={link.id} className="top-bar__item">
                                    <Link href={link.slug} className="top-bar__link">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="top-bar__left">
                        <div className="top-bar__email">
                            <a href="#" className="top-bar__email-text top-bar__link">
                                devify@gmail.com
                            </a>
                            <i className="fas fa-envelope top-bar__email-icon"></i>
                        </div>
                        <div className="top-bar__phone">
                            <a href="#" className="top-bar__phone-text top-bar__link">
                                09921558293
                            </a>
                            <i className="fas fa-phone top-bar__phone-icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar