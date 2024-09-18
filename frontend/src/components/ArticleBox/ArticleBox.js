import { Link } from 'react-router-dom'
import './ArticleBox.css'

function ArticleBox({ title, descrption, cover, slug }) {
    return (
        <div className="col-4">
            <div className="article-card">
                <div className="article-card__header">
                    <Link to={`/article-info/${slug}`} className="article-card__link-img">
                        <img style={{ width: '400px' }} src={`http://localhost:8000${cover}`} className="article-card__img" alt="Article Cover" />
                    </Link>
                </div>
                <div className="article-card__content">
                    <Link to={`/article-info/${slug}`} className="article-card__link">
                        {title}
                    </Link>
                    <p className="article-card__text">
                        {descrption}
                    </p>
                    <Link to={`/article-info/${slug}`} className="article-card__btn">بیشتر بخوانید</Link>
                </div>
            </div>
        </div>
    )
}

export default ArticleBox