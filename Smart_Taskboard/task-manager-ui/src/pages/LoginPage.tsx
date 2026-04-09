import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Mail, Lock, CheckSquare } from 'lucide-react'
import toast from 'react-hot-toast'
import { authApi } from '@/api/auth'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const schema = z.object({
  email:    z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})
type FormValues = z.infer<typeof schema>

export function LoginPage() {
  const { setAuth } = useAuthStore()
  const navigate    = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken)
      toast.success(`Welcome back, ${data.user.name.split(' ')[0]}!`)
      navigate('/')
    },
    onError: () => {
      toast.error('Incorrect email or password')
    },
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
          <blockquote className="text-3xl font-bold text-white leading-snug">
            "Clarity, focus, and control — all in one place."
          </blockquote>
          <p className="mt-4 text-primary-200 text-base">
            Manage projects, coordinate teams, and track progress with a simple and powerful task manager.
          </p>
        </div>
        <div className="flex gap-6">
          {[['Projects', '∞'], ['Members', '∞'], ['Tasks', '∞']].map(([label, val]) => (
            <div key={label}>
              <p className="text-2xl font-bold text-white">{val}</p>
              <p className="text-sm text-primary-200">{label}</p>
            </div>
          ))}
        </div>
      </div>

     
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <CheckSquare className="h-6 w-6 text-primary-600" />
            <span className="text-lg font-bold text-slate-900">SmartTask</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">Sign in</h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-700">
              Create one
            </Link>
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit((v) => mutation.mutate(v))}>
            <Input
              label="Email"
              type="text"
              autoComplete="email"
              placeholder="you@example.com"
              icon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              icon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              {...register('password')}
            />
            <div className="-mt-2 text-right">
              <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full" size="lg" loading={mutation.isPending}>
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
