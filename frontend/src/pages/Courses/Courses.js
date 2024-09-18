import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import './Courses.css'
import CourseBox from '../../components/CourseBox/CourseBox'
import Pagination from '../../components/Pagination/Pagination'
import apiRequests from '../../services/Axios/configs'
import { useSearchParams } from 'react-router-dom'

function Courses() {
    const [courses, setCourses] = useState([])
    const [pagesCount, setPagesCount] = useState(0)
    const [nextLink, setNextLink] = useState(null)
    const [previousLink, setPreviousLink] = useState(null)

    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || 1;

    useEffect(() => {
        apiRequests.get(`courses?page=${page}`)
            .then(res => {
                setCourses(res.data.result)
                setPagesCount(res.data.pages_count)
                setNextLink(res.data.links.next)
                setPreviousLink(res.data.links.previous)
            })
            .catch(err => console.log(err))
    }, [page])

    return (
        <>
            <Header />
            <Breadcrumb
                links={[
                    { id: 1, title: 'خانه', to: '/' },
                    { id: 2, title: 'تمامی دوره ها', to: '/courses' },
                ]}
            />

            <section className="courses">
                <div className="container">
                    <div className="courses-content">
                        <div className="container">
                            <div className="row">
                                {courses.map(course => (
                                    <CourseBox key={course._id} {...course} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <Pagination
                        pagesCount={pagesCount}
                        currentPage={page}
                        nextLink={nextLink}
                        previousLink={previousLink}
                        pathName='/courses'
                    />
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Courses