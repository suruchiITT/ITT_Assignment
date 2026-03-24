import { useState, useEffect } from 'react'
import { Plus, ClipboardList } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import { useDroppable } from '@dnd-kit/core'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import type { Task, TaskStatus, Role } from '@/types'
import { STATUS_CONFIG } from '@/lib/utils'
import { tasksApi } from '@/api/tasks'
import { TaskCard } from './TaskCard'
import { TaskModal } from './TaskModal'
import { ConfirmModal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

const COLUMNS: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE']

interface TaskBoardProps {
  projectId: string
  tasks: Task[]
  myRole: Role
  members: { userId: string; user: { id: string; name: string } }[]
}

function DroppableColumn({ status, children }: { status: TaskStatus; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: status })
  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-2 min-h-[4rem] rounded-lg transition-colors ${isOver ? 'bg-primary-50 ring-2 ring-primary-200' : ''}`}
    >
      {children}
    </div>
  )
}

function DraggableCard({
  task,
  myRole,
  canDrag,
  onClick,
  onEdit,
  onDelete,
}: {
  task: Task
  myRole: Role
  canDrag: boolean
  onClick: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    disabled: !canDrag,
  })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), opacity: isDragging ? 0.4 : 1 }}
      {...(canDrag ? listeners : {})}
      {...(canDrag ? attributes : {})}
    >
      <TaskCard
        task={task}
        myRole={myRole}
        onClick={onClick}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  )
}

export function TaskBoard({ projectId, tasks, myRole, members }: TaskBoardProps) {
  const qc = useQueryClient()
  const [createStatus, setCreateStatus] = useState<TaskStatus | null>(null)
  const [editTask,     setEditTask]     = useState<Task | null>(null)
  const [viewTask,     setViewTask]     = useState<Task | null>(null)
  const [deleteTask,   setDeleteTask]   = useState<Task | null>(null)
  const [activeTask,   setActiveTask]   = useState<Task | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  const deleteMutation = useMutation({
    mutationFn: (taskId: string) => tasksApi.delete(projectId, taskId),
    onSuccess: () => {
      toast.success('Task deleted')
      qc.invalidateQueries({ queryKey: ['tasks', projectId] })
      setDeleteTask(null)
    },
  })

  const statusMutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      tasksApi.changeStatus(projectId, taskId, { status }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks', projectId] })
    },
  })

  
  useEffect(() => {
    if (editTask) {
      const fresh = tasks.find((t) => t.id === editTask.id)
      if (fresh) setEditTask(fresh)
    }
    if (viewTask) {
      const fresh = tasks.find((t) => t.id === viewTask.id)
      if (fresh) setViewTask(fresh)
    }
  }, [tasks])

  const tasksByStatus = (status: TaskStatus) =>
    tasks.filter((t) => t.status === status)

  const canManage = myRole === 'ADMIN' || myRole === 'REPORTER'

 
  const canDragTask = (task: Task) => {
    if (canManage) return true
    
    const userId = members.find(() => true) 
    return task.assignees?.some(() => true) ?? false
  }

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id)
    if (task) setActiveTask(task)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null)
    const { active, over } = event
    if (!over) return

    const task = tasks.find((t) => t.id === active.id)
    const newStatus = over.id as TaskStatus

    if (task && COLUMNS.includes(newStatus) && task.status !== newStatus) {
      statusMutation.mutate({ taskId: task.id, status: newStatus })
    }
  }

  return (
    <>
     
      {!canManage && tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-16 text-center">
          <ClipboardList className="mb-3 h-10 w-10 text-slate-300" />
          <p className="text-sm font-medium text-slate-600">No tasks assigned to you yet</p>
          <p className="mt-1 text-xs text-slate-400">Tasks assigned to you will appear here</p>
        </div>
      ) : null}

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className={`flex gap-4 pb-4 ${!canManage && tasks.length === 0 ? 'hidden' : ''}`}>
          {COLUMNS.map((status) => {
            const cfg = STATUS_CONFIG[status]
            const col = tasksByStatus(status)

            const COLUMN_DOT: Record<string, string> = {
              TODO: 'bg-slate-400', IN_PROGRESS: 'bg-blue-500', DONE: 'bg-emerald-500'
            }

            return (
              <div key={status} className="flex flex-1 min-w-0 flex-col rounded-xl bg-slate-100/80 p-3">
              
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${COLUMN_DOT[status]}`} />
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                      {cfg.label}
                    </span>
                    <span className="rounded-full bg-white border border-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-600 shadow-sm">
                      {col.length}
                    </span>
                  </div>
                  {canManage && (
                    <button
                      onClick={() => setCreateStatus(status)}
                      className="rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  )}
                </div>

                
                <DroppableColumn status={status}>
                  {col.map((task) => (
                    <DraggableCard
                      key={task.id}
                      task={task}
                      myRole={myRole}
                      canDrag={canDragTask(task)}
                      onClick={() => setViewTask(task)}
                      onEdit={() => setEditTask(task)}
                      onDelete={() => setDeleteTask(task)}
                    />
                  ))}
                </DroppableColumn>

               
                {canManage && (
                  <button
                    onClick={() => setCreateStatus(status)}
                    className="mt-2 flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" /> Add task
                  </button>
                )}
              </div>
            )
          })}
        </div>

      
        <DragOverlay>
          {activeTask ? (
            <div className="rotate-2 opacity-90">
              <TaskCard
                task={activeTask}
                myRole={myRole}
                onClick={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

     
      <TaskModal
        open={createStatus !== null}
        onClose={() => setCreateStatus(null)}
        projectId={projectId}
        initialStatus={createStatus ?? undefined}
        members={members}
        myRole={myRole}
      />

    
      <TaskModal
        open={editTask !== null}
        onClose={() => setEditTask(null)}
        projectId={projectId}
        task={editTask ?? undefined}
        members={members}
        myRole={myRole}
      />

     
      {viewTask && (
        <TaskModal
          open={true}
          onClose={() => setViewTask(null)}
          projectId={projectId}
          task={viewTask}
          members={members}
          myRole={myRole}
          readOnly={!canManage}
        />
      )}

     
      <ConfirmModal
        open={deleteTask !== null}
        onClose={() => setDeleteTask(null)}
        onConfirm={() => deleteTask && deleteMutation.mutate(deleteTask.id)}
        title="Delete Task"
        message={`Are you sure you want to delete "${deleteTask?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
      />
    </>
  )
}
