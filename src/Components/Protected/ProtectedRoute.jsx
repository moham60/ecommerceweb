import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {
    if (localStorage.getItem('tkn') !== null) {
        return children;
    }
    return <Navigate to='/login'/>
}
