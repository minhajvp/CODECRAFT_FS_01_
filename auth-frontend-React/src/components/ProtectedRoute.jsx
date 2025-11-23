import { Navigate } from "react-router-dom"


export default function protectedRoute({children}){
    const access = localStorage.getItem('access')
    if(!access){
        return <Navigate to='/login' replace></Navigate>
    }
    return children
}