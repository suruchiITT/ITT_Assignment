import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  ChevronLeft, Kanban, Users, Mail, Activity, CheckSquare,
} from 'lucide-react'
import { projectsApi } from '@/api/projects'
import { tasksApi }     from '@/api/tasks'
import { membersApi }   from '@/api/members'
import { invitationsApi } from '@/api/invitations'
import { activityApi }  from '@/api/activity'
import { useAuthStore } from '@/store/authStore'
import { PageSpinner }  from '@/components/ui/Spinner'
import { RoleBadge }    from '@/components/ui/Badge'
import { TaskBoard }    from '@/components/tasks/TaskBoard'
import { MemberList }   from '@/components/members/MemberList'
import { InvitationPanel, InviteModal } from '@/components/invitations/InvitationPanel'
import { ActivityFeed } from '@/components/activity/ActivityFeed'
import { cn }           from '@/lib/utils'
import type { Role }    from '@/types'

type Tab = 'tasks' | 'members' | 'invitations' | 'activity'

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'tasks',       label: 'Tasks',       icon: <Kanban className="h-4 w-4" /> },
  { id: 'members',     label: 'Members',     icon: <Users className="h-4 w-4" /> },
  { id: 'invitations', label: 'Invitations', icon: <Mail className="h-4 w-4" /> },
  { id: 'activity',    label: 'Activity',    icon: <Activity className="h-4 w-4" /> },
]

export function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate      = useNavigate()
  const currentUser   = useAuthStore((s) => s.user)
  const [tab, setTab] = useState<Tab>('tasks')
  const [inviteOpen, setInviteOpen] = useState(false)

  
  const { data: project, isLoading: loadingProject } = useQuery({
    queryKey: ['project', projectId],
    queryFn:  () => projectsApi.get(projectId!),
    enabled:  !!projectId,
  })

  const { data: tasks = [], isLoading: loadingTasks } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn:  () => tasksApi.list(projectId!),
    enabled:  !!projectId && tab === 'tasks',
  })

  const { data: members = [], isLoading: loadingMembers } = useQuery({
    queryKey: ['members', projectId],
    queryFn:  () => membersApi.list(projectId!),
    enabled:  !!projectId,
  })

  const { data: invitations = [], isLoading: loadingInvitations } = useQuery({
    queryKey: ['invitations', projectId],
    queryFn:  () => invitationsApi.list(projectId!),
    enabled:  !!projectId && tab === 'invitations',
  })

  const { data: events = [], isLoading: loadingActivity } = useQuery({
    queryKey: ['activity', projectId],
    queryFn:  () => activityApi.list(projectId!),
    enabled:  !!projectId && tab === 'activity',
  })

  if (loadingProject) return <div className="p-8"><PageSpinner label="Loading project…" /></div>
  if (!project) return (
    <div className="p-8 text-center">
      <p className="text-slate-500">Project not found.</p>
      <Link to="/" className="text-primary-600 hover:underline text-sm mt-2 inline-block">Back to dashboard</Link>
    </div>
  )

  const myRole   = (project.myRole ?? 'REPORTEE') as Role
  const isAdmin  = myRole === 'ADMIN'

  
  const activeMembers = members
    .filter((m) => m.status === 'ACTIVE')
    .map((m) => ({ userId: m.userId, user: { id: m.userId, name: m.user?.name ?? 'Unknown' } }))

  const doneTasks = tasks.filter((t) => t.status === 'DONE').length
  const progressPct = tasks.length > 0 ? Math.round((doneTasks / tasks.length) * 100) : 0
  const activeMemberCount = members.filter((m) => m.status === 'ACTIVE').length

  return (
    <div className="flex flex-col h-full animate-fade-in">
     
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-primary-50/30 px-8 pt-6 pb-0">
        <button
          onClick={() => navigate('/')}
          className="mb-4 flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary-600 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Dashboard
        </button>

        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-900">{project.name}</h1>
              <RoleBadge role={myRole} />
            </div>

           
            <div className="mt-2 flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" /> {activeMemberCount} members
              </span>
              <span className="flex items-center gap-1.5">
                <Kanban className="h-3.5 w-3.5" /> {tasks.length} tasks
              </span>
              {tasks.length > 0 && (
                <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                  {doneTasks}/{tasks.length} done
                </span>
              )}
            </div>

            
            {tasks.length > 0 && (
              <div className="mt-3 flex items-center gap-3">
                <div className="h-1.5 w-48 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-500">{progressPct}%</span>
              </div>
            )}
          </div>
        </div>

     
        <nav className="flex gap-1 -mb-px">
          {TABS.map((t) => {
            if (t.id === 'invitations' && !isAdmin) return null
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  'flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-all duration-150',
                  tab === t.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                )}
              >
                {t.icon}
                {t.label}
                {t.id === 'members' && activeMemberCount > 0 && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                    {activeMemberCount}
                  </span>
                )}
                {t.id === 'invitations' && invitations.length > 0 && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                    {invitations.length}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

     
      <div className="flex-1 overflow-auto p-8">
        {tab === 'tasks' && (
          loadingTasks
            ? <PageSpinner label="Loading tasks…" />
            : <TaskBoard
                projectId={projectId!}
                tasks={tasks}
                myRole={myRole}
                members={activeMembers}
              />
        )}

        {tab === 'members' && (
          loadingMembers
            ? <PageSpinner label="Loading members…" />
            : <MemberList
                projectId={projectId!}
                members={members.filter((m) => m.status === 'ACTIVE')}
                myRole={myRole}
                onInvite={() => setInviteOpen(true)}
              />
        )}

        {tab === 'invitations' && (
          loadingInvitations
            ? <PageSpinner label="Loading invitations…" />
            : <InvitationPanel
                projectId={projectId!}
                invitations={invitations}
                myRole={myRole}
                onInvite={() => setInviteOpen(true)}
              />
        )}

        {tab === 'activity' && (
          loadingActivity
            ? <PageSpinner label="Loading activity…" />
            : <ActivityFeed events={events} />
        )}
      </div>

    
      <InviteModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        projectId={projectId!}
      />
    </div>
  )
}
