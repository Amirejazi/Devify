import './ArticleBox.css'

function ArticleBox({ title, desc, cover }) {
    return (
        <div className="col-4">
            <div className="article-card">
                <div className="article-card__header">
                    <a href="#" className="article-card__link-img">
                        <img src="images/blog/3.jpg" className="article-card__img" alt="Article Cover" />
                    </a>
                </div>
                <div className="article-card__content">
                    <a href="#" className="article-card__link">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                    </a>
                    <p className="article-card__text">
                        زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع...
                    </p>
                    <a href="#" className="article-card__btn">بیشتر بخوانید</a>
                </div>
            </div>
        </div>
    )
}

export default ArticleBox