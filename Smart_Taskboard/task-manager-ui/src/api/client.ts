import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
})

// ── Request interceptor — attach JWT ──────────────────────────────────────
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Response interceptor — unwrap & handle errors ─────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; success?: boolean }>) => {
    const status  = error.response?.status
    const message = error.response?.data?.message ?? 'Something went wrong'

    if (status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // Redirect to login only if not already there
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }

    // 404s and invitation-accept errors are handled locally by the page
    const url = error.config?.url ?? ''
    const suppressToast = status === 404 || url.includes('/invitations/accept')
    if (!suppressToast) {
      toast.error(message)
    }

    return Promise.reject(error)
  }
)

/** Extracts the message from an Axios error for local display. */
export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? error.message
  }
  return 'An unexpected error occurred'
}
