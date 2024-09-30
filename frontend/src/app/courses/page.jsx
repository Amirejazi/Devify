import apiRequest from "@/services/apiRequest";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import CourseBox from "@/components/CourseBox/CourseBox";
import Pagination from "@/components/Pagination/Pagination";

async function Courses({ searchParams }) {
    const page = searchParams.page ?? '1'

    const res = await apiRequest.get(`courses?page=${page}`);
    const courses = res.data.result
    const pagesCount = res.data.pages_count
    const nextLink = res.data.links.next
    const previousLink = res.data.links.previous


    return (
        <>
            <Breadcrumb
                links={[
                    {id: 1, title: 'خانه', to: '/'},
                    {id: 2, title: 'تمامی دوره ها', to: '/courses'},
                ]}
            />

            <section className="courses">
                <div className="container">
                    <div className="courses-content">
                        <div className="container">
                            <div className="row">
                                {courses.map(course => (
                                    <CourseBox key={course.id} {...course} />
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
        </>
    )
}

export default Courses