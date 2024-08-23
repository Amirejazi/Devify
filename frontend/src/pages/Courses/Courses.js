import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import './Courses.css'
import CourseBox from '../../components/CourseBox/CourseBox'
import Pagination from '../../components/Pagination/Pagination'

function Courses() {
    return (
        <>
            <Header />
            <Breadcrumb
                links={[
                    { id: 1, title: 'خانه', to: '/' },
                    { id: 2, title: 'تمامی دوره ها', to: '/courses' },
                ]}
            />

            <section class="courses">
                <div class="container">
                    <div class="courses-content">
                        <div class="container">
                            <div class="row">
                                <CourseBox />
                                <CourseBox />
                                <CourseBox />
                                <CourseBox />
                                <CourseBox />
                                <CourseBox />
                                <CourseBox />
                                <CourseBox />
                            </div>
                        </div>
                    </div>

                    <Pagination />
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Courses