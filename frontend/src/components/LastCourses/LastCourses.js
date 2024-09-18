import { useEffect, useState } from 'react'
import CourseBox from '../CourseBox/CourseBox'
import SectionHeader from '../SectionHeader/SectionHeader'
import './LastCourses.css'
import apiRequests from '../../services/Axios/configs'

function LastCourses() {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        apiRequests.get('courses')
        .then(res => setCourses(res.data.result))
    }, [])
    return (
        <div className="courses">
            <div className="container">
                <SectionHeader title='جدیدترین دوره ها' desc='سکوی پرتاپ شما به سمت موفقیت ' btnTitle='تمامی دوره ها' btnHref={'/courses'}/>

                <div className="courses-content">
                    <div className="container">
                        <div className="row">
                            {courses.splice(0, 6).map(course => (
                                <CourseBox key={course._id} {...course} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LastCourses