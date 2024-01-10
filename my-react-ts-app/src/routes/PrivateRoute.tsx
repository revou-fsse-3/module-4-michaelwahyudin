import { TOKEN_KEY } from '../utils/constant.ts'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem(TOKEN_KEY)

  if (!token) {
    return <Navigate to="/login" />
  }

  return children
}

export default PrivateRoute
