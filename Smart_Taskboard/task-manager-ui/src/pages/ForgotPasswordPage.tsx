import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { CheckSquare, Mail } from 'lucide-react'
import { authApi } from '@/api/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
})

type FormValues = z.infer<typeof schema>

export function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: authApi.forgotPassword,
  })

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600 p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <CheckSquare className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">SmartTask</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold leading-snug text-white">Reset your password</h2>
          <p className="mt-4 text-base text-primary-200">
            Enter your account email and we will send you a secure reset link.
          </p>
        </div>
        <p className="text-sm text-primary-200">The link will expire automatically for security.</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <CheckSquare className="h-6 w-6 text-primary-600" />
            <span className="text-lg font-bold text-slate-900">SmartTask</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">Forgot password</h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Remembered it?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
              Sign in
            </Link>
          </p>

          {mutation.isSuccess ? (
            <div className="mt-8 rounded-xl border border-primary-100 bg-primary-50 p-4 text-sm text-slate-700">
              {mutation.data.message}
            </div>
          ) : (
            <form className="mt-8 space-y-5" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
              <Input
                label="Email"
                type="text"
                autoComplete="email"
                placeholder="you@example.com"
                icon={<Mail className="h-4 w-4" />}
                error={errors.email?.message}
                {...register('email')}
              />
              <Button type="submit" className="w-full" size="lg" loading={mutation.isPending}>
                Send Reset Link
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
