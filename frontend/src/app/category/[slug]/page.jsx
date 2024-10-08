import './category.css'
import CourseBox from '@/components/CourseBox/CourseBox'
import Pagination from '@/components/Pagination/Pagination'
import apiRequest from "@/services/apiRequest";

async function Category({params, searchParams}) {
    const { slug } = params;
    const page = searchParams.page ?? '1'
    const res = await apiRequest.get(`courses/category/${slug}?page=${page}`);
    const courses = res.data.result
    const pagesCount = res.data.pages_count
    const nextLink = res.data.links.next
    const previousLink = res.data.links.previous

    return (
        <>
            <section className="courses">
                <div className="container">
                    <div className="courses-top-bar">
                        <div className="courses-top-bar__right">
                            <div className="courses-top-bar__row-btn courses-top-bar__icon--active">
                                <i className="fas fa-border-all courses-top-bar__icon"></i>
                            </div>
                            <div className="courses-top-bar__column-btn">
                                <i className="fas fa-align-left courses-top-bar__icon"></i>
                            </div>

                            <div className="courses-top-bar__selection">
                                <span className="courses-top-bar__selection-title">
                                    مرتب سازی پیش فرض
                                    <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                                </span>
                                <ul className="courses-top-bar__selection-list">
                                    <li className="courses-top-bar__selection-item courses-top-bar__selection-item--active">مرتب
                                        سازی پیش فرض
                                    </li>
                                    <li className="courses-top-bar__selection-item">مربت سازی بر اساس محبوبیت</li>
                                    <li className="courses-top-bar__selection-item">مربت سازی بر اساس امتیاز</li>
                                    <li className="courses-top-bar__selection-item">مربت سازی بر اساس آخرین</li>
                                    <li className="courses-top-bar__selection-item">مربت سازی بر اساس ارزان ترین</li>
                                    <li className="courses-top-bar__selection-item">مربت سازی بر اساس گران ترین</li>
                                </ul>
                            </div>
                        </div>

                        <div className="courses-top-bar__left">
                            <form action="#" className="courses-top-bar__form">
                                <input type="text" className="courses-top-bar__input" placeholder="جستجوی دوره ..."/>
                                <i className="fas fa-search courses-top-bar__search-icon"></i>
                            </form>
                        </div>

                    </div>
                    <div className="courses-content">
                        <div className="container">
                            <div className="row">
                                {courses.length !== 0 ?
                                    (courses.map(course => (
                                        <CourseBox key={course.id} {...course} />
                                    ))) :
                                    (<div className="alert alert-danger">
                                        هیچ دوره ای برای این دسته بندی یافت نشد!
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>

                    <Pagination
                        pagesCount={pagesCount}
                        currentPage={page}
                        nextLink={nextLink}
                        previousLink={previousLink}
                        pathName={`/category/${slug}`}
                    />
                </div>
            </section>
        </>
    )
}

export default Category