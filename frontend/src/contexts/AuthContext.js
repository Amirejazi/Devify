'use client'

import {createContext, useState, useEffect, useContext} from 'react'

export const AuthContext = createContext({
    isLoggedIn: false,
    userInfos: null,
    login: () => {},
    logout: () => {}
})

export function AuthProvider({ isLoggedIn, userInfos, children }) {
    //
    // const router = useRouter()
    //
    // const login = (userInfos) => {
    //     setIsLoggedIn(true)
    //     setUserInfos(userInfos)
    // }
    //
    // const logout = () => {
    //     setUserInfos({})
    //     setIsLoggedIn(false)
    //     router.push('/login') // Redirect to login page after logout
    // }

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            userInfos,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}