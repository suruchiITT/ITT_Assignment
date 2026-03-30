import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { CheckSquare, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { authApi } from '@/api/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const passwordSchema = z
  .string()
  .regex(
    /^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9\s])\S{6,10}$/,
    'Password must be 6-10 characters and include at least 1 letter and 1 special character'
  )

const schema = z.object({
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Confirm password is required'),
}).refine((values) => values.password === values.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type FormValues = z.infer<typeof schema>

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token') ?? ''

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: (data) => {
      toast.success(data.message)
      navigate('/login')
    },
  })

  const isTokenMissing = !token

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-slate-900 via-primary-900 to-primary-700 p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <CheckSquare className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">SmartTask</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold leading-snug text-white">Choose a new password</h2>
          <p className="mt-4 text-base text-primary-200">
            Use a strong password you have not used before for this account.
          </p>
        </div>
        <p className="text-sm text-primary-200">Once changed, use the new password the next time you sign in.</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <CheckSquare className="h-6 w-6 text-primary-600" />
            <span className="text-lg font-bold text-slate-900">SmartTask</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">Reset password</h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Back to{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
              Sign in
            </Link>
          </p>

          {isTokenMissing ? (
            <div className="mt-8 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
              This reset link is invalid. Please request a new password reset email.
            </div>
          ) : (
            <form
              className="mt-8 space-y-5"
              onSubmit={handleSubmit((values) => mutation.mutate({ token, password: values.password }))}
            >
              <Input
                label="New Password"
                type="password"
                autoComplete="new-password"
                placeholder="6-10 chars, 1 letter, 1 special"
                icon={<Lock className="h-4 w-4" />}
                error={errors.password?.message}
                {...register('password')}
              />
              <Input
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
                placeholder="Re-enter your password"
                icon={<Lock className="h-4 w-4" />}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />
              <Button type="submit" className="w-full" size="lg" loading={mutation.isPending}>
                Reset Password
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
