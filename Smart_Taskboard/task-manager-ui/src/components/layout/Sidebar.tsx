import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, LogOut, CheckSquare } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { Avatar } from '@/components/ui/Avatar'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user, clearAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAuth()
    toast.success('Logged out')
    navigate('/login')
  }

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-30 flex flex-col bg-slate-900 text-white transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      
      <button
        onClick={onToggle}
        className="flex h-16 w-full items-center gap-3 border-b border-slate-700/60 px-4 hover:bg-slate-800 transition-colors"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-500">
          <CheckSquare className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <span className="text-base font-bold tracking-tight whitespace-nowrap">SmartTask</span>
        )}
      </button>

     
      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
        {!collapsed && (
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            Navigation
          </p>
        )}

        <NavLink
          to="/"
          end
          title={collapsed ? 'Dashboard' : undefined}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              collapsed && 'justify-center px-2',
              isActive
                ? 'bg-primary-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            )
          }
        >
          <LayoutDashboard className="h-4 w-4 shrink-0" />
          {!collapsed && 'Dashboard'}
        </NavLink>
      </nav>

      
      <div className="border-t border-slate-700/60 px-2 py-4">
        {!collapsed && (
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            {user && <Avatar name={user.name} avatarUrl={user.avatarUrl} size="sm" />}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{user?.name}</p>
              <p className="truncate text-xs text-slate-400">{user?.email}</p>
            </div>
          </div>
        )}

        {collapsed && user && (
          <div className="flex justify-center py-2">
            <Avatar name={user.name} avatarUrl={user.avatarUrl} size="sm" />
          </div>
        )}

        <button
          onClick={handleLogout}
          title={collapsed ? 'Sign out' : undefined}
          className={cn(
            'mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-white',
            collapsed && 'justify-center px-2'
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && 'Sign out'}
        </button>
      </div>
    </aside>
  )
}
