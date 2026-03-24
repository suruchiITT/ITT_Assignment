import { useState } from 'react'
import type { ActivityEvent } from '@/types'
import { formatRelativeTime } from '@/lib/utils'
import { Avatar } from '@/components/ui/Avatar'
import {
  UserPlus, UserMinus, FolderOpen, CheckSquare,
  Mail, MailX, ShieldCheck, Clock, Pencil, Trash2,
  ArrowRightLeft, UserCheck,
} from 'lucide-react'
const STATUS_LABELS: Record<string, string> = {
  TODO:        'To Do',
  IN_PROGRESS: 'In Progress',
  DONE:        'Done',
}
const ACTION_CONFIG: Record<string, { icon: React.ReactNode; color: string; label: (m: Record<string, string>) => string }> = {
  PROJECT_CREATED:     { icon: <FolderOpen className="h-3.5 w-3.5" />,      color: 'bg-primary-100 text-primary-600', label: () => 'created the project' },
  PROJECT_DELETED:     { icon: <Trash2 className="h-3.5 w-3.5" />,          color: 'bg-red-100 text-red-600',         label: (m) => `deleted project "${m.name}"` },
  MEMBER_JOINED:       { icon: <UserPlus className="h-3.5 w-3.5" />,        color: 'bg-emerald-100 text-emerald-600', label: () => 'joined the project' },
  MEMBER_REMOVED:      { icon: <UserMinus className="h-3.5 w-3.5" />,       color: 'bg-red-100 text-red-500',         label: () => 'removed a member from the project' },
  MEMBER_ROLE_CHANGED: { icon: <ShieldCheck className="h-3.5 w-3.5" />,     color: 'bg-amber-100 text-amber-600',     label: (m) => `changed a member's role from ${m.oldRole} → ${m.newRole}` },
  INVITATION_SENT:     { icon: <Mail className="h-3.5 w-3.5" />,            color: 'bg-blue-100 text-blue-600',       label: (m) => `invited ${m.email} as ${m.role}` },
  INVITATION_REVOKED:  { icon: <MailX className="h-3.5 w-3.5" />,           color: 'bg-slate-100 text-slate-500',     label: (m) => `revoked invitation for ${m.email}` },
  TASK_CREATED:        { icon: <CheckSquare className="h-3.5 w-3.5" />,     color: 'bg-primary-100 text-primary-600', label: (m) => `created task "${m.title}"` },
  TASK_UPDATED:        { icon: <Pencil className="h-3.5 w-3.5" />,          color: 'bg-amber-100 text-amber-600',     label: (m) => `updated task "${m.title}"` },
  TASK_DELETED:        { icon: <Trash2 className="h-3.5 w-3.5" />,          color: 'bg-red-100 text-red-500',         label: (m) => `deleted task "${m.title}"` },
  TASK_STATUS_CHANGED: { icon: <ArrowRightLeft className="h-3.5 w-3.5" />,  color: 'bg-purple-100 text-purple-600',   label: (m) => `changed the status of the task ${m.title}` },
  TASK_ASSIGNED:       { icon: <UserCheck className="h-3.5 w-3.5" />,       color: 'bg-teal-100 text-teal-600',       label: () => 'assigned a user to a task' },
  TASK_UNASSIGNED:     { icon: <UserMinus className="h-3.5 w-3.5" />,       color: 'bg-slate-100 text-slate-500',     label: () => 'unassigned a user from a task' },
}

function getDateLabel(dateStr: string): string {
  const date = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  if (isSameDay(date, today)) return 'Today'
  if (isSameDay(date, yesterday)) return 'Yesterday'
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function groupByDate(events: ActivityEvent[]): { label: string; events: ActivityEvent[] }[] {
  const groups: { label: string; events: ActivityEvent[] }[] = []
  let lastLabel = ''
  for (const event of events) {
    const label = getDateLabel(event.createdAt)
    if (label !== lastLabel) {
      groups.push({ label, events: [event] })
      lastLabel = label
    } else {
      groups[groups.length - 1].events.push(event)
    }
  }
  return groups
}

interface ActivityFeedProps {
  events: ActivityEvent[]
}

export function ActivityFeed({ events }: ActivityFeedProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-16 text-center">
        <Clock className="h-8 w-8 text-slate-300 mb-2" />
        <p className="text-sm font-medium text-slate-500">No activity yet</p>
        <p className="text-xs text-slate-400 mt-1">Actions on this project will appear here</p>
      </div>
    )
  }

  const groups = groupByDate(events)
  const [focusedId, setFocusedId] = useState<string | null>(null)

  return (
    <div className="space-y-6 max-w-2xl animate-fade-in">
      {groups.map((group) => (
        <div key={group.label}>
         
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {group.label}
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

         
          <div className="space-y-1">
            {group.events.map((event) => {
              const cfg = ACTION_CONFIG[event.action] ?? {
                icon: <Clock className="h-3.5 w-3.5" />,
                color: 'bg-slate-100 text-slate-500',
                label: () => event.action.toLowerCase().replace(/_/g, ' '),
              }

              const isFocused = focusedId === event.id
              const isDimmed  = focusedId !== null && !isFocused

              return (
                <div
                  key={event.id}
                  onMouseEnter={() => setFocusedId(event.id)}
                  onMouseLeave={() => setFocusedId(null)}
                  className={[
                    'flex items-center gap-3 rounded-xl px-3 py-3 cursor-default transition-all duration-200',
                    isFocused
                      ? 'bg-white shadow-md border border-slate-200 scale-[1.02] z-10 relative'
                      : 'hover:bg-slate-50',
                    isDimmed ? 'opacity-40 blur-[0.5px] scale-[0.99]' : '',
                  ].join(' ')}
                >
                 
                  <div className="shrink-0">
                    {event.actor ? (
                      <Avatar name={event.actor.name} avatarUrl={event.actor.avatarUrl} size={isFocused ? 'md' : 'sm'} />
                    ) : (
                      <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center">
                        <span className="text-xs text-slate-400">?</span>
                      </div>
                    )}
                  </div>

                  
                  <div className={`shrink-0 flex items-center justify-center rounded-full transition-all duration-200 ${cfg.color} ${isFocused ? 'h-8 w-8' : 'h-6 w-6'}`}>
                    {cfg.icon}
                  </div>

                 
                  <div className="flex-1 min-w-0">
                    <p className={`text-slate-700 truncate transition-all duration-200 ${isFocused ? 'text-base' : 'text-sm'}`}>
                      <span className="font-semibold text-slate-900">
                        {event.actor?.name ?? 'Unknown'}
                      </span>{' '}
                      {cfg.label(event.metadata ?? {})}
                    </p>
                    {isFocused && (
                      <p className="text-xs text-slate-400 mt-0.5">
                        {formatRelativeTime(event.createdAt)}
                      </p>
                    )}
                  </div>

                  
                  {!isFocused && (
                    <span className="shrink-0 text-xs text-slate-400">
                      {formatRelativeTime(event.createdAt)}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
