import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  icon?: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:   'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500 shadow-sm',
  secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-slate-400',
  ghost:     'text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-400',
  danger:    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-sm',
  outline:   'border border-slate-300 text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400',
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-8  px-3 text-xs  gap-1.5',
  md: 'h-9  px-4 text-sm  gap-2',
  lg: 'h-11 px-5 text-base gap-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, icon, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
