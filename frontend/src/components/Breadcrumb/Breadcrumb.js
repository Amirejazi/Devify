import React from 'react'
import './Breadcrumb.css'
import { Link } from 'react-router-dom'

function Breadcrumb({ links }) {
    return (
        <section className="breadcrumb">
            <div className="container">
                <div className="breadcrumb__content">
                    <div className="breadcrumb__home-content-icon">
                        <i className="fas fa-home breadcrumb__home-icon"></i>
                    </div>
                    <ul className="breadcrumb__list">
                        {links.map(link => (
                            <li key={link.id} className="breadcrumb__item">
                                <Link to={link.to} className="breadcrumb__link">
                                    {link.title}
                                    {link.id !== links.length && (
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