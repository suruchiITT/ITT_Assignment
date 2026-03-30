import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Mail, Lock, User, CheckSquare } from 'lucide-react'
import toast from 'react-hot-toast'
import { authApi } from '@/api/auth'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const passwordSchema = z
  .string()
  .regex(
    /^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9\s])\S{6,10}$/,
    'Password must be 6-10 characters and include at least 1 letter and 1 special character'
  )

const schema = z.object({
  name:     z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name must be at most 100 characters'),
  email:    z.string().email('Enter a valid email'),
  password: passwordSchema,
})
type FormValues = z.infer<typeof schema>

export function RegisterPage() {
  const { setAuth } = useAuthStore()
  const navigate    = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken)
      toast.success(`Welcome, ${data.user.name.split(' ')[0]}!`)
      navigate('/')
    },
  })

  return (
    <div className="flex min-h-screen">
     
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-slate-900 via-primary-900 to-primary-700 p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <CheckSquare className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">SmartTask</span>
        </div>
        <div className="space-y-6">
          {[
            { title: 'Create projects instantly', desc: 'Any registered user can create a project and become its admin.' },
            { title: 'Invite your team', desc: 'Send email invitations to collaborators as Reporter or Reportee.' },
            { title: 'Track everything', desc: 'Kanban board, activity feed, and role-based access — all built in.' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div className="mt-1 h-5 w-5 rounded-full bg-primary-400 flex items-center justify-center shrink-0">
                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-sm text-primary-200">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-primary-300">
          © 2026 SmartTask. Built for modern teams.
        </p>
      </div>

      
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <CheckSquare className="h-6 w-6 text-primary-600" />
            <span className="text-lg font-bold text-slate-900">SmartTask</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">Create account</h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
              Sign in
            </Link>
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit((v) => mutation.mutate(v))}>
            <Input
              label="Full Name"
              type="text"
              autoComplete="name"
              placeholder="Alice Smith"
              maxLength={100}
              icon={<User className="h-4 w-4" />}
              error={errors.name?.message}
              {...register('name')}
            />
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
              autoComplete="new-password"
              placeholder="6-10 chars, 1 letter, 1 special"
              icon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              {...register('password')}
            />
            <Button type="submit" className="w-full" size="lg" loading={mutation.isPending}>
              Create Account
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-slate-400">
            By registering, you automatically become Admin of any project you create.
          </p>
        </div>
      </div>
    </div>
  )
}
