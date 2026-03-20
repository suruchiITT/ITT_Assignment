import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { Layout } from '@/components/layout/Layout'

/** Requires authentication — unauthenticated users are sent to /login. */
export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

/** Public-only route — authenticated users are redirected to the dashboard. */
export function PublicRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (isAuthenticated) return <Navigate to="/" replace />
  return <Outlet />
}
