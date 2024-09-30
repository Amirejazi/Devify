import './ArticleBox.css'
import Link from "next/link";

function ArticleBox({ title, description, cover, slug }) {
    return (
        <div className="col-4">
            <div className="article-card">
                <div className="article-card__header">
                    <Link href={`/article-info/${slug}`} className="article-card__link-img">
                        <img style={{ width: '400px' }} src={`http://localhost:8080${cover}`} className="article-card__img" alt="Article Cover" />
                    </Link>
                </div>
                <div className="article-card__content">
                    <Link href={`/article-info/${slug}`} className="article-card__link">
                        {title}
                    </Link>
                    <p className="article-card__text">
                        {description}
                    </p>
                    <Link href={`/article-info/${slug}`} className="article-card__btn">بیشتر بخوانید</Link>
                </div>
            </div>
        </div>
    )
}

export default ArticleBox