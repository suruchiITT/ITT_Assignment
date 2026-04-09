import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { UserPlus, ShieldCheck, UserX } from 'lucide-react'
import type { ProjectMember, Role } from '@/types'
import { membersApi } from '@/api/members'
import { Avatar } from '@/components/ui/Avatar'
import { RoleBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Input'
import { ConfirmModal } from '@/components/ui/Modal'
import { formatRelativeTime } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'

interface MemberListProps {
  projectId: string
  members: ProjectMember[]
  myRole: Role
  onInvite: () => void
}

interface MemberRowProps {
  member: ProjectMember
  isAdmin: boolean
  currentUserId?: string
  isFocused: boolean
  isDimmed: boolean
  isChangingRole: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onStartChangeRole: () => void
  onCancelChangeRole: () => void
  onRoleChange: (role: Role) => void
  onRemove: () => void
}

function MemberRow({
  member, isAdmin, currentUserId,
  isFocused, isDimmed,
  isChangingRole,
  onMouseEnter, onMouseLeave,
  onStartChangeRole, onCancelChangeRole, onRoleChange, onRemove,
}: MemberRowProps) {
  const isMe = member.userId === currentUserId

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={[
        'flex items-center gap-4 px-4 transition-all duration-200',
        isFocused
          ? 'py-5 bg-white shadow-md border-y border-slate-200 z-10 relative scale-[1.01]'
          : 'py-3.5 border-b border-slate-100 last:border-b-0',
        isDimmed ? 'opacity-40 blur-[0.5px]' : '',
      ].join(' ')}
    >
      <Avatar
        name={member.user?.name ?? 'Unknown'}
        avatarUrl={member.user?.avatarUrl}
        size={isFocused ? 'lg' : 'md'}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={`font-medium text-slate-900 truncate transition-all duration-200 ${isFocused ? 'text-base' : 'text-sm'}`}>
            {member.user?.name}
            {isMe && (
              <span className="ml-1.5 text-xs text-slate-400">(you)</span>
            )}
          </p>
        </div>
        <p className="text-xs text-slate-500 truncate">{member.user?.email}</p>
        {isFocused && member.joinedAt && (
          <p className="text-xs text-slate-400 mt-0.5">
            Joined {formatRelativeTime(member.joinedAt)}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {isAdmin && isChangingRole ? (
          <div className="flex items-center gap-2">
            <Select
              className="h-8 text-xs"
              defaultValue={member.role}
              onChange={(e) => onRoleChange(e.target.value as Role)}
            >
              <option value="ADMIN">Admin</option>
              <option value="REPORTER">Reporter</option>
              <option value="REPORTEE">Reportee</option>
            </Select>
            <button
              onClick={onCancelChangeRole}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
          </div>
        ) : (
          <RoleBadge role={member.role} />
        )}

        {!isFocused && member.joinedAt && (
          <span className="hidden sm:block text-xs text-slate-400 whitespace-nowrap">
            Joined {formatRelativeTime(member.joinedAt)}
          </span>
        )}

        {isAdmin && !isMe && (
          <div className="flex items-center gap-1">
            <button
              onClick={onStartChangeRole}
              title="Change role"
              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <ShieldCheck className="h-4 w-4" />
            </button>
            <button
              onClick={onRemove}
              title="Remove member"
              className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <UserX className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function MemberList({ projectId, members, myRole, onInvite }: MemberListProps) {
  const qc = useQueryClient()
  const currentUser = useAuthStore((s) => s.user)
  const [removeTarget, setRemoveTarget] = useState<ProjectMember | null>(null)
  const [changingRole, setChangingRole] = useState<string | null>(null)
  const [focusedId, setFocusedId] = useState<string | null>(null)

  const removeMutation = useMutation({
    mutationFn: (userId: string) => membersApi.remove(projectId, userId),
    onSuccess: () => {
      toast.success('Member removed')
      qc.invalidateQueries({ queryKey: ['members', projectId] })
      setRemoveTarget(null)
    },
  })

  const roleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: Role }) =>
      membersApi.changeRole(projectId, userId, { role }),
    onSuccess: () => {
      toast.success('Role updated')
      qc.invalidateQueries({ queryKey: ['members', projectId] })
      setChangingRole(null)
    },
  })

  const isAdmin = myRole === 'ADMIN'

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{members.length} member{members.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            isAdmin={isAdmin}
            currentUserId={currentUser?.id}
            isFocused={focusedId === member.id}
            isDimmed={focusedId !== null && focusedId !== member.id}
            isChangingRole={changingRole === member.id}
            onMouseEnter={() => setFocusedId(member.id)}
            onMouseLeave={() => setFocusedId(null)}
            onStartChangeRole={() => setChangingRole(member.id)}
            onCancelChangeRole={() => setChangingRole(null)}
            onRoleChange={(role) => roleMutation.mutate({ userId: member.userId, role })}
            onRemove={() => setRemoveTarget(member)}
          />
        ))}
      </div>

      <ConfirmModal
        open={removeTarget !== null}
        onClose={() => setRemoveTarget(null)}
        onConfirm={() => removeTarget && removeMutation.mutate(removeTarget.userId)}
        title="Remove Member"
        message={`Remove ${removeTarget?.user?.name} from this project? They will lose access immediately.`}
        confirmLabel="Remove"
        loading={removeMutation.isPending}
      />
    </div>
  )
}
