import { cn } from '@/lib/utils'
import { PRIORITY_CONFIG, ROLE_CONFIG, STATUS_CONFIG } from '@/lib/utils'
import type { TaskPriority, TaskStatus, Role } from '@/types'

interface BadgeProps {
  className?: string
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
}

const variantClasses = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-orange-100 text-orange-700',
  danger:  'bg-red-100 text-red-700',
  info:    'bg-blue-100 text-blue-700',
}

const STATUS_FALLBACK = { label: 'Unknown', color: 'text-slate-500', bg: 'bg-slate-100', border: 'border-slate-200' }
const PRIORITY_FALLBACK = { label: 'Unknown', color: 'text-slate-500', bg: 'bg-slate-100', dot: 'bg-slate-300' }

export function Badge({ className, children, variant = 'default' }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      variantClasses[variant],
      className
    )}>
      {children}
    </span>
  )
}

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const cfg = PRIORITY_CONFIG[priority] ?? PRIORITY_FALLBACK
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
      cfg.bg, cfg.color
    )}>
      <span className={cn('h-1.5 w-1.5 rounded-full', cfg.dot)} />
      {cfg.label}
    </span>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const cfg = (STATUS_CONFIG as Record<string, typeof STATUS_FALLBACK>)[status] ?? STATUS_FALLBACK
  return (
    <span className={cn(
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
      cfg.bg, cfg.color, cfg.border
    )}>
      {cfg.label}
    </span>
  )
}

export function RoleBadge({ role }: { role: Role }) {
  const cfg = ROLE_CONFIG[role]
  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
      cfg.bg, cfg.color
    )}>
      {cfg.label}
    </span>
  )
}
