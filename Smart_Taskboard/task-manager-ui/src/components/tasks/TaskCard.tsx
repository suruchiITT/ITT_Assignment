import { CalendarDays, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import type { Task, Role } from '@/types'
import { PriorityBadge } from '@/components/ui/Badge'
import { AvatarGroup } from '@/components/ui/Avatar'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface TaskCardProps {
  task: Task
  myRole: Role
  onClick: () => void
  onDelete: () => void
  onEdit: () => void
}

const STATUS_LEFT_BORDER: Record<string, string> = {
  TODO:        'border-l-slate-300',
  IN_PROGRESS: 'border-l-blue-400',
  DONE:        'border-l-emerald-400',
}

export function TaskCard({ task, myRole, onClick, onDelete, onEdit }: TaskCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const canManage   = myRole === 'ADMIN' || myRole === 'REPORTER'
  const isOverdue   = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'DONE'
  const borderColor = STATUS_LEFT_BORDER[task.status] ?? 'border-l-slate-300'

  return (
    <div
      onClick={onClick}
      className={cn(
        'group cursor-pointer rounded-xl border border-slate-200 border-l-4 bg-white p-4 shadow-sm',
        'hover:border-r-slate-200 hover:border-t-slate-200 hover:border-b-slate-200',
        'hover:border-l-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150',
        borderColor
      )}
    >
    
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-slate-800 leading-snug line-clamp-2 flex-1">
          {task.title}
        </h3>

        {canManage && (
          <div className="relative shrink-0" ref={menuRef}>
            <button
              onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v) }}
              className="rounded-md p-1 text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-slate-100 hover:text-slate-700 transition-all"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-7 z-20 w-36 rounded-lg border border-slate-200 bg-white py-1 shadow-lg animate-scale-in">
                <button
                  onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onEdit() }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onDelete() }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      
      {task.description && (
        <p className="mt-1.5 text-xs text-slate-400 line-clamp-2">{task.description}</p>
      )}

      
      <div className="mt-3 flex items-center justify-between gap-2">
        <PriorityBadge priority={task.priority} />

        <div className="flex items-center gap-2">
          {task.dueDate && (
            <span className={cn(
              'flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium',
              isOverdue ? 'bg-red-50 text-red-500' : 'text-slate-400'
            )}>
              <CalendarDays className="h-3 w-3" />
              {formatDate(task.dueDate)}
            </span>
          )}
          {(task.assignees?.length ?? 0) > 0 && (
            <AvatarGroup users={task.assignees!} max={3} />
          )}
        </div>
      </div>
    </div>
  )
}
