import ArticleInfo from "./pages/ArticleInfo/ArticleInfo";
import Category from "./pages/Category/Category";
import CourseInfo from "./pages/CourseInfo/CourseInfo";
import Courses from "./pages/Courses/Courses";
import Index from "./pages/Index/Index";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

const routes = [
    { path: '/', element: <Index /> },
    { path: '/courses', element: <Courses /> },
    { path: '/course-info/:courseName', element: <CourseInfo /> },
    { path: '/category/:categoryName', element: <Category /> },
    { path: '/article-info/:articleName', element: <ArticleInfo /> },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
]

export default routes