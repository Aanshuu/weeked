// "use client"

// import { useRouter } from "next/navigation"
// import React, { useState, useEffect, ReactNode } from "react"

// interface ProtectedRouteProps {
//     children: ReactNode
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//     const router = useRouter()
//     const [isAuthenticated, setIsAuthenticated] = useState(false)
    
//     useEffect(() => {
//         if(typeof window !== 'undefined'){
//             const token = localStorage.getItem('token')
//             if(token){
//                 setIsAuthenticated(true)
//             } else {
//                 router.push('/signIn')
//             }
//         }
//     }, [router])

//     if(!isAuthenticated){
//         return null
//     }

//     return <>{children}</>
// }

// src/components/common/ProtectedRoute.tsx
"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    redirect("/auth/signIn")
  }

  return <>{children}</>
}