import CourseBox from '../CourseBox/CourseBox'
import SectionHeader from '../SectionHeader/SectionHeader'
import './LastCourses.css'

function LastCourses() {
    return (
        <div className="courses">
            <div className="container">
                <SectionHeader title='جدیدترین دوره ها' desc='سکوی پرتاپ شما به سمت موفقیت ' btnTitle='تمامی دوره ها'/>

                <div className="courses-content">
                    <div className="container">
                        <div className="row">
                            <CourseBox />
                            <CourseBox />
                            <CourseBox />
                            <CourseBox />
                            <CourseBox />
                            <CourseBox />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LastCourses