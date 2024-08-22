import AboutUs from '../../components/AboutUs/AboutUs'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Landing from '../../components/Landing/Landing'
import LastArticles from '../../components/LastArticles/LastArticles'
import LastCourses from '../../components/LastCourses/LastCourses'
import PopularCourses from '../../components/PopularCourses/PopularCourses'
import PresellCourses from '../../components/PresellCourses/PresellCourses'

function Index() {
    return (
        <>
            <Header />
            <Landing />
            <LastCourses />
            <AboutUs />
            <PopularCourses />
            <PresellCourses />
            <LastArticles />
            <Footer/>
        </>
    )
}

export default Index