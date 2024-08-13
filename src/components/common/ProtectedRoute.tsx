"use client"

import { useRouter } from "next/navigation"
import React, { useState, useEffect, ReactNode } from "react"

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    
    useEffect(() => {
        if(typeof window !== 'undefined'){
            const token = localStorage.getItem('token')
            if(token){
                setIsAuthenticated(true)
            } else {
                router.push('/signIn')
            }
        }
    }, [router])

    if(!isAuthenticated){
        return null
    }

    return <>{children}</>
}

export default ProtectedRoute