import CourseBox from '../CourseBox/CourseBox'
import SectionHeader from '../SectionHeader/SectionHeader'
import './LastCourses.css'
import apiRequest from '@/services/apiRequest'

async function LastCourses() {

    const res = await apiRequest.get('courses');
    const courses = res.data.result

    return (
        <div className="courses">
            <div className="container">
                <SectionHeader title='جدیدترین دوره ها' desc='سکوی پرتاپ شما به سمت موفقیت ' btnTitle='تمامی دوره ها' btnHref={'/courses'}/>

                <div className="courses-content">
                    <div className="container">
                        <div className="row">
                            {courses.splice(0, 6).map(course => (
                                <CourseBox key={course.id} {...course} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LastCourses