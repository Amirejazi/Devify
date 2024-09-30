import './Pagination.css'
import Link from "next/link";

function Pagination({ pagesCount, currentPage, previousLink, nextLink, pathName }) {

    const pages = Array.from({ length: pagesCount })
    return (
        <div className="courses-pagination">
            <ul className="courses__pagination-list">
                {previousLink && (
                    <li className="courses__pagination-item">
                        <Link href={`${pathName}?page=${+currentPage - 1}`} className="courses__pagination-link">
                            <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
                        </Link>
                    </li>
                )}

                {pages.map((_, index) => (
                    <li className="courses__pagination-item">
                        <Link href={`${pathName}?page=${index + 1}`} className={`courses__pagination-link ${index + 1 == currentPage ? 'courses__pagination-link--active' : ''}`}>
                            {index + 1}
                        </Link>
                    </li>
                ))}
                {nextLink && (
                    <li className="courses__pagination-item">
                        <Link href={`${pathName}?page=${+currentPage + 1}`} className="courses__pagination-link">
                            <i className="fas fa-long-arrow-alt-left courses__pagination-icon"></i>
                        </Link>
                    </li>
                )}

            </ul>
        </div>
    )
}

export default Pagination