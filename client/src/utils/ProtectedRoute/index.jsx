import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context"

const ProtectedRoute = ({ admin = false, redirectPath = "/" }) => {
  const { token, user } = useAuth()

  if (admin) {
    if (!user.isAdmin) {
      return <Navigate to={redirectPath} replace />
    }
  } else {
    if (!token) {
      return <Navigate to={redirectPath} replace />
    }
  }

  return <Outlet />
}

export default ProtectedRoute
