import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Mail, Send, X, Clock } from 'lucide-react'
import type { Invitation, Role } from '@/types'
import { invitationsApi } from '@/api/invitations'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Badge, RoleBadge } from '@/components/ui/Badge'
import { formatRelativeTime } from '@/lib/utils'


const schema = z.object({
  email: z.string().email('Invalid email address'),
  role:  z.enum(['REPORTER', 'REPORTEE']),
})
type FormValues = z.infer<typeof schema>

interface InviteModalProps {
  open: boolean
  onClose: () => void
  projectId: string
}

export function InviteModal({ open, onClose, projectId }: InviteModalProps) {
  const qc = useQueryClient()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', role: 'REPORTER' },
  })

  const mutation = useMutation({
    mutationFn: (values: FormValues) =>
      invitationsApi.send(projectId, { email: values.email, role: values.role as Exclude<Role, 'ADMIN'> }),
    onSuccess: () => {
      toast.success('Invitation sent!')
      qc.invalidateQueries({ queryKey: ['invitations', projectId] })
      reset()
      onClose()
    },
  })

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Invite Member"
      description="Send an invitation email to add someone to this project."
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            icon={<Send className="h-4 w-4" />}
            onClick={handleSubmit((v) => mutation.mutate(v))}
            loading={mutation.isPending}
          >
            Send Invite
          </Button>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit((v) => mutation.mutate(v))}>
        <Input
          label="Email Address"
          type="email"
          placeholder="colleague@company.com"
          icon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register('email')}
        />
        <Select label="Role" {...register('role')}>
          <option value="REPORTER">Reporter — can create & manage tasks</option>
          <option value="REPORTEE">Reportee — read-only access</option>
        </Select>
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5 text-xs text-amber-700">
          <strong>Note:</strong> Admins cannot be invited. Promote an existing member to Admin instead.
        </div>
      </form>
    </Modal>
  )
}



interface InvitationPanelProps {
  projectId: string
  invitations: Invitation[]
  myRole: Role
  onInvite: () => void
}

export function InvitationPanel({ projectId, invitations, myRole, onInvite }: InvitationPanelProps) {
  const qc = useQueryClient()
  const isAdmin = myRole === 'ADMIN'

  const revokeMutation = useMutation({
    mutationFn: (invId: string) => invitationsApi.revoke(projectId, invId),
    onSuccess: () => {
      toast.success('Invitation revoked')
      qc.invalidateQueries({ queryKey: ['invitations', projectId] })
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {invitations.length} pending invitation{invitations.length !== 1 ? 's' : ''}
        </p>
        {isAdmin && (
          <Button size="sm" icon={<Mail className="h-3.5 w-3.5" />} onClick={onInvite}>
            Invite
          </Button>
        )}
      </div>

      {invitations.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-12 text-center">
          <Mail className="h-8 w-8 text-slate-300 mb-2" />
          <p className="text-sm font-medium text-slate-500">No pending invitations</p>
          {isAdmin && (
            <p className="text-xs text-slate-400 mt-1">Invite someone to collaborate on this project</p>
          )}
        </div>
      ) : (
        <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white overflow-hidden">
          {invitations.map((inv) => (
            <div key={inv.id} className="flex items-center gap-4 px-4 py-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                <Mail className="h-4 w-4 text-slate-500" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{inv.email}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Clock className="h-3 w-3 text-slate-400" />
                  <span className="text-xs text-slate-400">
                    Expires {formatRelativeTime(inv.expiresAt)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <RoleBadge role={inv.role} />
                <Badge variant="warning">Pending</Badge>
                {isAdmin && (
                  <button
                    onClick={() => revokeMutation.mutate(inv.id)}
                    disabled={revokeMutation.isPending}
                    className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    title="Revoke invitation"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
