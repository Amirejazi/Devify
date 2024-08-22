import Category from "./pages/Category/Category";
import CourseInfo from "./pages/CourseInfo/CourseInfo";
import Index from "./pages/Index/Index";

const routes = [
    { path: '/', element: <Index /> },
    { path: '/course-info/:courseName', element: <CourseInfo /> },
    { path: '/category/:categoryName', element: <Category /> },
    { path: '/article-info/:articleName', element: <Category /> },

]

export default routes