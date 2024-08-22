import ArticleBox from '../ArticleBox/ArticleBox'
import SectionHeader from '../SectionHeader/SectionHeader'
import './LastArticles.css'

function LastArticles() {
    return (
        <section className="articles">
            <div className="container">
                <SectionHeader title='جدیدترین مقاله ها' desc='پیش به سوی ارتقای دانش' btnTitle='تمامی مقاله ها' />

                <div className="articles__content">
                    <div className="row">
                        <ArticleBox
                            title='نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون'
                            desc='زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع'
                            cover='images/blog3.jpg' 
                        />
                        <ArticleBox
                            title='نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون'
                            desc='زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع'
                            cover='images/blog3.jpg' 
                        />
                        <ArticleBox
                            title='نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون'
                            desc='زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع'
                            cover='images/blog3.jpg' 
                        />
                    </div>
                </div>
            </div>
        </section>

    )
}

export default LastArticles