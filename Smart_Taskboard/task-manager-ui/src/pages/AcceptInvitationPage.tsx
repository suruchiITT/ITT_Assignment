import { useEffect, useRef, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { CheckCircle, XCircle, Loader2, CheckSquare } from 'lucide-react'
import { invitationsApi } from '@/api/invitations'
import { Button } from '@/components/ui/Button'

export function AcceptInvitationPage() {
  const [params] = useSearchParams()
  const token    = params.get('token')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  
  const hasStarted = useRef(false)

  const mutation = useMutation({
    mutationFn: (t: string) => invitationsApi.accept(t),
    onSuccess: (msg) => {
      setStatus('success')
      setMessage(msg)
    },
    onError: (err: any) => {
      setStatus('error')
      setMessage(err?.response?.data?.message ?? 'This invitation is invalid or has expired.')
    },
  })

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('No invitation token found in the URL.')
      return
    }
    if (hasStarted.current) return
    hasStarted.current = true
    setStatus('loading')
    mutation.mutate(token)
  }, [token])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600">
            <CheckSquare className="h-7 w-7 text-white" />
          </div>
        </div>

        {status === 'loading' && (
          <>
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary-500 mb-4" />
            <h2 className="text-lg font-semibold text-slate-900">Accepting invitation…</h2>
            <p className="mt-2 text-sm text-slate-500">Please wait while we verify your token.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h2 className="text-xl font-bold text-slate-900">You're in! 🎉</h2>
            <p className="mt-2 text-sm text-slate-600">{message}</p>
            <div className="mt-6 flex flex-col gap-3">
              <Link to="/">
                <Button className="w-full">Go to Dashboard</Button>
              </Link>
              <Link to="/login">
                <Button variant="ghost" className="w-full">Sign in to a different account</Button>
              </Link>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
            <h2 className="text-xl font-bold text-slate-900">Invitation failed</h2>
            <p className="mt-2 text-sm text-slate-600">{message}</p>
            <div className="mt-6">
              <Link to="/login">
                <Button variant="outline" className="w-full">Back to Sign In</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
