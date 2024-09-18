import { useEffect, useState } from 'react';
import ArticleBox from '../ArticleBox/ArticleBox'
import SectionHeader from '../SectionHeader/SectionHeader'
import './LastArticles.css'
import apiRequests from '../../services/Axios/configs';

function LastArticles() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        apiRequests.get(`articles`)
            .then((res) => {
                setArticles(res.data.result);
            });
    }, []);

    return (
        <section className="articles">
            <div className="container">
                <SectionHeader title='جدیدترین مقاله ها' desc='پیش به سوی ارتقای دانش' btnTitle='تمامی مقاله ها' />

                <div className="articles__content">
                    <div className="row">
                        {articles.slice(0, 3).map((article) => (
                            <ArticleBox key={article.id} {...article} />
                        ))}
                    </div>
                </div>
            </div>
        </section>

    )
}

export default LastArticles