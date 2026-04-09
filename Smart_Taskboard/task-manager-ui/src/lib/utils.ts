import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow, format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(dateStr: string): string {
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true })
  } catch {
    return dateStr
  }
}

export function formatDate(dateStr: string): string {
  try {
    return format(new Date(dateStr), 'MMM d, yyyy')
  } catch {
    return dateStr
  }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const PRIORITY_CONFIG = {
  LOW:    { label: 'Low',    color: 'text-slate-500',  bg: 'bg-slate-100',  dot: 'bg-slate-400'  },
  MEDIUM: { label: 'Medium', color: 'text-blue-600',   bg: 'bg-blue-50',    dot: 'bg-blue-400'   },
  HIGH:   { label: 'High',   color: 'text-orange-600', bg: 'bg-orange-50',  dot: 'bg-orange-400' },
  URGENT: { label: 'Urgent', color: 'text-red-600',    bg: 'bg-red-50',     dot: 'bg-red-500'    },
} as const

export const STATUS_CONFIG = {
  TODO:        { label: 'To Do',       color: 'text-slate-600', bg: 'bg-slate-100',   border: 'border-slate-200' },
  IN_PROGRESS: { label: 'In Progress', color: 'text-blue-700',  bg: 'bg-blue-50',     border: 'border-blue-200'  },
  DONE:        { label: 'Done',        color: 'text-green-700', bg: 'bg-green-50',    border: 'border-green-200' },
} as const

export const ROLE_CONFIG = {
  ADMIN:    { label: 'Admin',    color: 'text-primary-700', bg: 'bg-primary-100' },
  REPORTER: { label: 'Reporter', color: 'text-blue-700',    bg: 'bg-blue-100'    },
  REPORTEE: { label: 'Reportee', color: 'text-green-700',   bg: 'bg-green-100'   },
} as const
