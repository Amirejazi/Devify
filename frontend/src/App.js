import { useRoutes } from "react-router-dom";
import routes from './routes'
import AuthContext from './context/authContext'
import { useEffect, useState } from "react";
import apiRequests from "./Services/Axios/configs";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState(null)
    const [userInfos, setUserInfos] = useState({})

    const router = useRoutes(routes)

    const login = (token, userInfos) => {
        setToken(token)
        setIsLoggedIn(true)
        setUserInfos(userInfos)
        localStorage.setItem('authToken', token)
    }

    const logout = (token) => {
        setToken(null)
        setUserInfos({})
        setIsLoggedIn(false)
        localStorage.removeItem('authToken')
    }

    useEffect(() => {
        const localStorageData = localStorage.getItem('authToken')
        if (localStorageData) {
            apiRequests.get('auth/me')
            .then(res => {
                setIsLoggedIn(true)
                setUserInfos(res.data)               
            })
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            token,
            userInfos,
            login,
            logout
        }}>
            {router}
        </AuthContext.Provider>
    );
}

export default App;
