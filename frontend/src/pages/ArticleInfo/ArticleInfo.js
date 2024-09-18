import React, { useEffect, useState } from 'react'
import Header from './../../components/Header/Header'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import Footer from '../../components/Footer/Footer'
import './ArticleInfo.css'
import CommentTextArea from '../../components/CommentTextArea/CommentTextArea'
import { useParams } from 'react-router-dom'
import apiRequests from '../../services/Axios/configs'

function ArticleInfo() {
    const [category, setCategory] = useState({})
    const [creator, setCreator] = useState({})
    const [articleDetails, setArticleDetails] = useState({})

    const { articleName } = useParams()

    useEffect(() => {
        apiRequests.get(`articles/${articleName}`)
            .then(res => {
                setArticleDetails(res.data)
                setCategory(res.data.category)
                setCreator(res.data.creator)
            })
    }, [])

    return (
        <>
            <Header />
            <Breadcrumb
                links={[
                    { id: 1, title: 'خانه', to: '/' },
                    { id: 2, title: 'مقاله ها', to: '/articles' },
                    { id: 3, title: articleDetails.title, to: `/article-info/${articleDetails.slug}` }
                ]}
            />

            <main className="main">
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <div className="article">
                                <h1 className="article__title">
                                    {articleDetails.title}
                                </h1>
                                <div className="article__header">
                                    <div className="article-header__category article-header__item">
                                        <i className="far fa-folder article-header__icon"></i>
                                        <a href="#" className="article-header__text">{category.title} </a>
                                    </div>
                                    <div className="article-header__category article-header__item">
                                        <i className="far fa-user article-header__icon"></i>
                                        <span className="article-header__text"> ارسال شده توسط {creator.name}</span>
                                    </div>
                                    <div className="article-header__category article-header__item">
                                        <i className="far fa-clock article-header__icon"></i>
                                        <span className="article-header__text"> ارسال شده توسط {creator.name}</span>
                                    </div>
                                    <div className="article-header__category article-header__item">
                                        <i className="far fa-eye article-header__icon"></i>
                                        <span className="article-header__text">  2.14k بازدید</span>
                                    </div>
                                </div>
                                <img src={`http://localhost:8000${articleDetails.cover}`} alt="Article Cover" className="article__banner" />

                                <div className="article__score">
                                    <div className="article__score-icons">
                                        <img src="/images/svgs/star_fill.svg" className="article__score-icon" />
                                        <img src="/images/svgs/star_fill.svg" className="article__score-icon" />
                                        <img src="/images/svgs/star_fill.svg" className="article__score-icon" />
                                        <img src="/images/svgs/star_fill.svg" className="article__score-icon" />
                                        <img src="/images/svgs/star.svg" className="article__score-icon" />
                                    </div>
                                    <span className="article__score-text">4.2/5 - (5 امتیاز)</span>
                                </div>

                                <p className="article__paragraph paragraph">
                                   {articleDetails.body}
                                </p>

                                <div className="article-read">
                                    <span className="article-read__title">آنچه در این مقاله خواهید خواند</span>
                                    <ul className="article-read__list">
                                        <li className="article-read__item">
                                            <a href="#" className="article-read__link">معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:</a>
                                        </li>
                                        <li className="article-read__item">
                                            <a href="#" className="article-read__link">یک راه آسان‌تر، دوره‌ های جاوا اسکریپت آکادمی سبزلرن!</a>
                                        </li>
                                        <li className="article-read__item">
                                            <a href="#" className="article-read__link">ثبت نام در دوره‌ های جاوا اسکریپت سبزلرن:</a>
                                        </li>
                                    </ul>
                                </div>

                                <img src="/images/blog/2.jpg" alt="Article Image" className="article__seconadary-banner" />
                                <div className="article-section">
                                    <h2 className="article-section__title">
                                        معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                                    </h2>
                                    <p className="paragraph article-section__text">
                                        توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان و به زبان فارسی این زبان را یاد بگیرید.
                                    </p>
                                    <img src="/images/blog/4.png" alt="article body img" className="article-section__img" />
                                </div>
                                <div className="article-section">
                                    <h2 className="article-section__title">
                                        معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                                    </h2>
                                    <p className="paragraph article-section__text">
                                        توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان و به زبان فارسی این زبان را یاد بگیرید.
                                    </p>
                                </div>
                                <div className="article-section">
                                    <h2 className="article-section__title">
                                        معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                                    </h2>
                                    <p className="paragraph article-section__text">
                                        توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان و به زبان فارسی این زبان را یاد بگیرید.
                                    </p>
                                    <img src="/images/blog/3.jpg" alt="article body img" className="article-section__img" />
                                </div>

                                <div className="article-social-media">
                                    <span className="article-social-media__text">اشتراک گذاری :</span>
                                    <a href="#" className="article-social-media__link">
                                        <i className="fab fa-telegram-plane article-social-media__icon"></i>
                                    </a>
                                    <a href="#" className="article-social-media__link">
                                        <i className="fab fa-twitter article-social-media__icon"></i>
                                    </a>
                                    <a href="#" className="article-social-media__link">
                                        <i className="fab fa-facebook-f article-social-media__icon"></i>
                                    </a>
                                </div>

                            </div>

                            <div className="suggestion-articles">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="suggestion-articles__right suggestion-articles__content">
                                            <a href="#" className="suggestion-articles__icon-link">
                                                <i className="fas fa-arrow-right suggestion-articles__icon"></i>
                                            </a>
                                            <a href="#" className="suggestion-articles__link">
                                                سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ | تجربه برنامه نویسان
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="suggestion-articles__left suggestion-articles__content">
                                            <a href="#" className="suggestion-articles__icon-link">
                                                <i className="fas fa-arrow-left suggestion-articles__icon"></i>
                                            </a>
                                            <a href="#" className="suggestion-articles__link">
                                                سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ | تجربه برنامه نویسان
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <CommentTextArea /> */}

                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}

export default ArticleInfo