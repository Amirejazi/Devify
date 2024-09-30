import './SectionHeader.css'
import Link from "next/link";

function SectionHeader({ title, desc, btnTitle , btnHref}) {
    return (
        <div className="courses-header">
            <div className="courses-header__right">
                <span className="courses-header__title title">{title}</span>
                <span className="courses-header__text">{desc}</span>
            </div>
            {btnTitle && (
                <div className="courses-header__left">
                    <Link href={`${btnHref}`} className="courses-header__link">
                        {btnTitle}
                        <i className="fas fa-arrow-left courses-header__icon"></i>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default SectionHeader