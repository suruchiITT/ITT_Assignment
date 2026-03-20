import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Plus, FolderOpen, CheckSquare, Trash2, MoreVertical, Search, Layers } from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'
import toast from 'react-hot-toast'
import { projectsApi } from '@/api/projects'
import { useAuthStore } from '@/store/authStore'
import { PageHeader } from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal, ConfirmModal } from '@/components/ui/Modal'
import { PageSpinner } from '@/components/ui/Spinner'
import { RoleBadge } from '@/components/ui/Badge'
import type { Project } from '@/types'

const CARD_ACCENTS = [
  'from-violet-500 to-purple-600',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-amber-500',
  'from-pink-500 to-rose-500',
  'from-indigo-500 to-blue-600',
]

const schema = z.object({ name: z.string().min(1, 'Name is required').max(100) })
type FormValues = z.infer<typeof schema>

function CreateProjectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const qc = useQueryClient()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })
  const mutation = useMutation({
    mutationFn: (v: FormValues) => projectsApi.create({ name: v.name }),
    onSuccess: () => {
      toast.success('Project created!')
      qc.invalidateQueries({ queryKey: ['projects'] })
      reset(); onClose()
    },
  })
  return (
    <Modal open={open} onClose={onClose} title="New Project"
      description="Create a project — you'll be the Admin automatically." size="sm"
      footer={<><Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit((v) => mutation.mutate(v))} loading={mutation.isPending}>Create Project</Button></>}
    >
      <Input label="Project Name" placeholder="e.g. Website Redesign"
        error={errors.name?.message} {...register('name')} autoFocus />
    </Modal>
  )
}

function ProjectCard({ project, index, onDelete }: { project: Project; index: number; onDelete: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length]

  return (
    <div
      className="animate-slide-up group relative flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Gradient accent top bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${accent}`} />

      {/* Menu */}
      {project.myRole === 'ADMIN' && (
        <div className="absolute right-4 top-5">
          <button
            onClick={(e) => { e.preventDefault(); setMenuOpen((v) => !v) }}
            className="rounded-md p-1 text-slate-300 opacity-0 group-hover:opacity-100 hover:bg-slate-100 hover:text-slate-600 transition-all"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-8 z-10 w-36 rounded-lg border border-slate-200 bg-white py-1 shadow-lg animate-scale-in">
              <button
                onClick={(e) => { e.preventDefault(); setMenuOpen(false); onDelete() }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          )}
        </div>
      )}

      <Link to={`/projects/${project.id}`} className="flex-1 flex flex-col p-5">
        {/* Gradient icon */}
        <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accent} shadow-sm`}>
          <FolderOpen className="h-5 w-5 text-white" />
        </div>

        <h3 className="font-semibold text-slate-900 truncate pr-6 text-base">{project.name}</h3>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
          <CheckSquare className="h-3.5 w-3.5" />
          <span>{project.taskCount ?? 0} {project.taskCount === 1 ? 'task' : 'tasks'}</span>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          {project.myRole && <RoleBadge role={project.myRole as any} />}
          <span className="text-xs text-slate-400">{formatRelativeTime(project.createdAt)}</span>
        </div>
      </Link>
    </div>
  )
}

export function DashboardPage() {
  const qc   = useQueryClient()
  const user = useAuthStore((s) => s.user)
  const [createOpen, setCreateOpen]     = useState(false)
  const [deleteProject, setDeleteProject] = useState<Project | null>(null)
  const [search, setSearch]             = useState('')

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn:  projectsApi.list,
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => projectsApi.delete(id),
    onSuccess: () => {
      toast.success('Project deleted')
      qc.invalidateQueries({ queryKey: ['projects'] })
      setDeleteProject(null)
    },
  })

  const filtered   = projects.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
  const totalTasks = projects.reduce((s, p) => s + (p.taskCount ?? 0), 0)

  if (isLoading) return <div className="p-8"><PageSpinner label="Loading projects…" /></div>

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <PageHeader
        title={`Welcome, ${user?.name.split(' ')[0]} 👋`}
        subtitle="Here are all your projects"
        action={
          <Button icon={<Plus className="h-4 w-4" />} onClick={() => setCreateOpen(true)}>
            New Project
          </Button>
        }
      />

      {/* Stats */}
      {projects.length > 0 && (
        <div className="flex gap-4">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50">
              <Layers className="h-4 w-4 text-primary-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900 leading-none">{projects.length}</p>
              <p className="text-xs text-slate-500 mt-0.5">Projects</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
              <CheckSquare className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900 leading-none">{totalTasks}</p>
              <p className="text-xs text-slate-500 mt-0.5">Total Tasks</p>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      {projects.length > 0 && (
        <Input placeholder="Search projects…" icon={<Search className="h-4 w-4" />}
          value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 py-20 text-center animate-fade-in">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <FolderOpen className="h-8 w-8 text-slate-300" />
          </div>
          <p className="text-base font-medium text-slate-500">
            {search ? 'No projects match your search' : 'No projects yet'}
          </p>
          {!search && (
            <>
              <p className="text-sm text-slate-400 mt-1 mb-6">Create your first project to get started</p>
              <Button icon={<Plus className="h-4 w-4" />} onClick={() => setCreateOpen(true)}>Create Project</Button>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onDelete={() => setDeleteProject(project)} />
          ))}
        </div>
      )}

      <CreateProjectModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <ConfirmModal
        open={deleteProject !== null} onClose={() => setDeleteProject(null)}
        onConfirm={() => deleteProject && deleteMutation.mutate(deleteProject.id)}
        title="Delete Project"
        message={`Delete "${deleteProject?.name}"? All tasks and data will be permanently removed.`}
        confirmLabel="Delete Project" loading={deleteMutation.isPending}
      />
    </div>
  )
}
