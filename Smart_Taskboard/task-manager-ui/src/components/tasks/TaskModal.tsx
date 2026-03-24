import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type { Task, TaskStatus, TaskPriority, Role } from '@/types'
import { tasksApi } from '@/api/tasks'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input, TextArea, Select } from '@/components/ui/Input'
import { PriorityBadge, StatusBadge } from '@/components/ui/Badge'
import { Avatar, AvatarGroup } from '@/components/ui/Avatar'
import { formatDate } from '@/lib/utils'
import { UserPlus, UserMinus, CalendarDays } from 'lucide-react'

const schema = z.object({
  title:       z.string().min(1, 'Title is required').max(200),
  description: z.string().optional(),
  priority:    z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  status:      z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
  dueDate:     z.string().optional().refine((val) => !val || new Date(val) >= new Date(new Date().toDateString()), {
    message: 'Due date cannot be in the past',
  }),
})

type FormValues = z.infer<typeof schema>

interface TaskModalProps {
  open: boolean
  onClose: () => void
  projectId: string
  task?: Task
  initialStatus?: TaskStatus
  members: { userId: string; user: { id: string; name: string } }[]
  myRole: Role
  readOnly?: boolean
}

export function TaskModal({
  open, onClose, projectId, task, initialStatus, members, myRole, readOnly = false,
}: TaskModalProps) {
  const qc = useQueryClient()
  const isEdit = !!task
  const today = new Date().toISOString().split('T')[0]
  const [selectedAssigneeIds, setSelectedAssigneeIds] = useState<string[]>([])

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '', description: '', priority: 'MEDIUM',
      status: initialStatus ?? 'TODO', dueDate: '',
    },
  })

  const VALID_STATUSES: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE']
  const normalizeStatus = (s: string): TaskStatus =>
    VALID_STATUSES.includes(s as TaskStatus) ? (s as TaskStatus) : 'IN_PROGRESS'

  useEffect(() => {
    if (task) {
      setSelectedAssigneeIds(task.assignees?.map((assignee) => assignee.id) ?? [])
      reset({
        title:       task.title,
        description: task.description ?? '',
        priority:    task.priority,
        status:      normalizeStatus(task.status),
        dueDate:     task.dueDate ? task.dueDate.substring(0, 10) : '',
      })
    } else {
      setSelectedAssigneeIds([])
      reset({ title: '', description: '', priority: 'MEDIUM', status: initialStatus ?? 'TODO', dueDate: '' })
    }
  }, [task, initialStatus, reset, open])

  
  const toISODate = (d?: string) => (d ? `${d}T00:00:00Z` : undefined)

  const createMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const createdTask = await tasksApi.create(projectId, {
        title: values.title,
        description: values.description || undefined,
        priority: values.priority as TaskPriority,
        status: values.status as TaskStatus,
        dueDate: toISODate(values.dueDate || undefined),
      })

      if (selectedAssigneeIds.length > 0) {
        await tasksApi.assign(projectId, createdTask.id, { userIds: selectedAssigneeIds })
      }

      return createdTask
    },
    onSuccess: () => {
      toast.success('Task created')
      qc.invalidateQueries({ queryKey: ['tasks', projectId] })
      setSelectedAssigneeIds([])
      onClose()
    },
  })

  const updateMutation = useMutation({
    mutationFn: (values: FormValues) =>
      tasksApi.update(projectId, task!.id, {
        title: values.title,
        description: values.description || undefined,
        priority: values.priority as TaskPriority,
        dueDate: values.dueDate ? toISODate(values.dueDate) : null,
        clearDueDate: !values.dueDate,
      }),
    onSuccess: async (updatedTask) => {
      const currentStatus = watch('status') as TaskStatus
      if (currentStatus !== task!.status) {
        await tasksApi.changeStatus(projectId, task!.id, { status: currentStatus })
      }
      toast.success('Task updated')
      qc.invalidateQueries({ queryKey: ['tasks', projectId] })
      onClose()
    },
  })

  const assignMutation = useMutation({
    mutationFn: (userId: string) =>
      tasksApi.assign(projectId, task!.id, { userIds: [userId] }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks', projectId] }),
  })

  const unassignMutation = useMutation({
    mutationFn: (userId: string) =>
      tasksApi.unassign(projectId, task!.id, userId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks', projectId] }),
  })

  const onSubmit = (values: FormValues) => {
    if (isEdit) updateMutation.mutate(values)
    else createMutation.mutate(values)
  }

  const assigneeIds = new Set(task?.assignees?.map((a) => a.id) ?? [])
  const canAssign = myRole === 'ADMIN' || myRole === 'REPORTER'

  const toggleCreateAssignee = (userId: string) => {
    setSelectedAssigneeIds((current) =>
      current.includes(userId)
        ? current.filter((id) => id !== userId)
        : [...current, userId]
    )
  }

  const statusMutation = useMutation({
    mutationFn: (status: TaskStatus) =>
      tasksApi.changeStatus(projectId, task!.id, { status }),
    onSuccess: () => {
      toast.success('Status updated')
      qc.invalidateQueries({ queryKey: ['tasks', projectId] })
    },
  })

  if (readOnly && task) {
    return (
      <Modal open={open} onClose={onClose} title={task.title} size="md"
        footer={<Button variant="outline" onClick={onClose}>Close</Button>}
      >
        <div className="space-y-4">
          {task.description && <p className="text-sm text-slate-600">{task.description}</p>}
          <div className="flex gap-3 flex-wrap items-center">
            <PriorityBadge priority={task.priority} />
            <Select
              className="h-8 text-xs w-36"
              value={task.status}
              onChange={(e) => statusMutation.mutate(e.target.value as TaskStatus)}
              disabled={statusMutation.isPending}
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </Select>
          </div>
          {task.dueDate && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays className="h-4 w-4" />
              Due {formatDate(task.dueDate)}
            </div>
          )}
          {(task.assignees?.length ?? 0) > 0 && (
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2">Assignees</p>
              <div className="flex gap-2 flex-wrap">
                {task.assignees?.map((a) => (
                  <div key={a.id} className="flex items-center gap-2">
                    <Avatar name={a.name} size="sm" />
                    <span className="text-sm text-slate-700">{a.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    )
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit Task' : 'Create Task'}
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            loading={createMutation.isPending || updateMutation.isPending}
          >
            {isEdit ? 'Save Changes' : 'Create Task'}
          </Button>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={<><span>Title</span> <span className="text-red-500">*</span></>}
          error={errors.title?.message}
          {...register('title')}
          placeholder="What needs to be done?"
        />

        <TextArea
          label="Description"
          rows={3}
          placeholder="Optional details…"
          {...register('description')}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select label="Priority" {...register('priority')}>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </Select>

          <Select label="Status" {...register('status')}>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </Select>
        </div>

        <Input label="Due Date" type="date" min={today} {...register('dueDate')} />

        {!isEdit && canAssign && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700">Assignees</p>
              {selectedAssigneeIds.length > 0 && (
                <span className="text-xs text-slate-500">
                  {selectedAssigneeIds.length} selected
                </span>
              )}
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto rounded-lg border border-slate-200 p-2">
              {members.map((m) => {
                const assigned = selectedAssigneeIds.includes(m.userId)
                return (
                  <div key={m.userId} className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-50">
                    <div className="flex items-center gap-2">
                      <Avatar name={m.user.name} size="xs" />
                      <span className="text-sm text-slate-700">{m.user.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleCreateAssignee(m.userId)}
                      className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                        assigned
                          ? 'text-red-600 hover:bg-red-50'
                          : 'text-primary-600 hover:bg-primary-50'
                      }`}
                    >
                      {assigned
                        ? <><UserMinus className="h-3 w-3" /> Remove</>
                        : <><UserPlus className="h-3 w-3" /> Assign</>
                      }
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        
        {isEdit && canAssign && (
          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">Assignees</p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {members.map((m) => {
                const assigned = assigneeIds.has(m.userId)
                return (
                  <div key={m.userId} className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-50">
                    <div className="flex items-center gap-2">
                      <Avatar name={m.user.name} size="xs" />
                      <span className="text-sm text-slate-700">{m.user.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => assigned
                        ? unassignMutation.mutate(m.userId)
                        : assignMutation.mutate(m.userId)
                      }
                      className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                        assigned
                          ? 'text-red-600 hover:bg-red-50'
                          : 'text-primary-600 hover:bg-primary-50'
                      }`}
                    >
                      {assigned
                        ? <><UserMinus className="h-3 w-3" /> Remove</>
                        : <><UserPlus className="h-3 w-3" /> Assign</>
                      }
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </form>
    </Modal>
  )
}
