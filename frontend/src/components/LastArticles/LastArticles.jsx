
import SectionHeader from '../SectionHeader/SectionHeader'
import './LastArticles.css'
import apiRequest from "@/services/apiRequest";
import ArticleBox from "@/components/ArticleBox/ArticleBox";

async function LastArticles() {

    const res = await apiRequest.get('articles');
    const articles = res.data.result

    return (
        <section className="articles">
            <div className="container">
                <SectionHeader title='جدیدترین مقاله ها' desc='پیش به سوی ارتقای دانش' btnTitle='تمامی مقاله ها' />

                <div className="articles__content">
                    <div className="row">
                        {articles?.slice(0, 3).map((article) => (
                            <ArticleBox key={article.id} {...article} />
                        ))}
                    </div>
                </div>
            </div>
        </section>

    )
}

export default LastArticles