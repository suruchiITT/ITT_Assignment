import { cn, getInitials } from '@/lib/utils'

interface AvatarProps {
  name: string
  avatarUrl?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-11 w-11 text-base',
}

const colors = [
  'bg-red-400',    'bg-orange-400', 'bg-amber-400',
  'bg-green-500',  'bg-teal-500',   'bg-cyan-500',
  'bg-blue-500',   'bg-indigo-500', 'bg-violet-500',
  'bg-pink-500',
]

function colorFor(name: string): string {
  let sum = 0
  for (const ch of name) sum += ch.charCodeAt(0)
  return colors[sum % colors.length]
}

export function Avatar({ name, avatarUrl, size = 'md', className }: AvatarProps) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className={cn('rounded-full object-cover ring-2 ring-white', sizeClasses[size], className)}
      />
    )
  }
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold text-white ring-2 ring-white select-none',
        sizeClasses[size],
        colorFor(name),
        className
      )}
      title={name}
    >
      {getInitials(name)}
    </span>
  )
}

export function AvatarGroup({ users, max = 3 }: { users: { name: string; avatarUrl?: string }[], max?: number }) {
  const visible = users.slice(0, max)
  const rest    = users.length - max
  return (
    <div className="flex -space-x-2">
      {visible.map((u, i) => (
        <Avatar key={i} name={u.name} avatarUrl={u.avatarUrl} size="sm" />
      ))}
      {rest > 0 && (
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600 ring-2 ring-white">
          +{rest}
        </span>
      )}
    </div>
  )
}
