import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { ProtectedRoute, PublicRoute } from '@/components/auth/ProtectedRoute'
import { LoginPage }             from '@/pages/LoginPage'
import { RegisterPage }          from '@/pages/RegisterPage'
import { DashboardPage }         from '@/pages/DashboardPage'
import { ProjectPage }           from '@/pages/ProjectPage'
import { AcceptInvitationPage }  from '@/pages/AcceptInvitationPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public-only routes — authenticated users bounced to dashboard */}
          <Route element={<PublicRoute />}>
            <Route path="/login"    element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Always-public (no auth required or redirect) */}
          <Route path="/invitations/accept" element={<AcceptInvitationPage />} />

          {/* Protected routes (require JWT) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/"                          element={<DashboardPage />} />
            <Route path="/projects/:projectId"       element={<ProjectPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          className: 'text-sm font-medium',
          success: { iconTheme: { primary: '#6366f1', secondary: '#fff' } },
          duration: 3500,
        }}
      />
    </QueryClientProvider>
  )
}
