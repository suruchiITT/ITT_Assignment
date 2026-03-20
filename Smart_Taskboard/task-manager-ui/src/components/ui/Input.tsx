import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
              {icon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm',
              'placeholder:text-slate-400 text-slate-900',
              'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
              'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500',
              'transition-colors duration-150',
              error && 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
              icon && 'pl-10',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          className={cn(
            'block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm',
            'placeholder:text-slate-400 text-slate-900 resize-none',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            'disabled:cursor-not-allowed disabled:bg-slate-50',
            'transition-colors duration-150',
            error && 'border-red-400',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    )
  }
)
TextArea.displayName = 'TextArea'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, children, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <select
          id={inputId}
          ref={ref}
          className={cn(
            'block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm',
            'text-slate-900',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            'transition-colors duration-150',
            error && 'border-red-400',
            className
          )}
          {...props}
        >
          {children}
        </select>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'
