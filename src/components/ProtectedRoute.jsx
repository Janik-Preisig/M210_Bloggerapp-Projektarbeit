import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div className="page-message">Session wird geladen …</div>
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />
  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" replace />
  return children
}
