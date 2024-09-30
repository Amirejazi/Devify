import './Breadcrumb.css'
import Link from "next/link";

function Breadcrumb({ links }) {
    return (
        <section className="breadcrumb">
            <div className="container">
                <div className="breadcrumb__content">
                    <div className="breadcrumb__home-content-icon">
                        <i className="fas fa-home breadcrumb__home-icon"></i>
                    </div>
                    <ul className="breadcrumb__list">
                        {links.map((link, index )=> (
                            <li key={link.id} className="breadcrumb__item">
                                <Link href={link.to} className="breadcrumb__link">
                                    {link.title}
                                    {index < links.length - 1 && (
                                        <i className="fas fa-angle-left breadcrumb__icon"></i>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Breadcrumb