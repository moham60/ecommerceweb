import { Navigate} from "react-router-dom";


export default function ProtectedRoute2({ children }) {
     
    if (localStorage.getItem('tkn') !== null) {
        return <Navigate to='/home'/>
    }
    return <>{ children}</>
}