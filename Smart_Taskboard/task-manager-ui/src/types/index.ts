
export interface User {
  id: string
  email: string
  name: string
  avatarUrl?: string
  createdAt: string
}

export interface AuthResponse {
  accessToken: string
  tokenType: string
  expiresIn: number
  user: User
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
}

export interface MessageResponse {
  message: string
}


export interface Project {
  id: string
  name: string
  createdBy: string
  myRole?: string
  taskCount?: number
  createdAt: string
  updatedAt?: string
}

export interface CreateProjectRequest {
  name: string
}



export type Role = 'ADMIN' | 'REPORTER' | 'REPORTEE'
export type MemberStatus = 'ACTIVE' | 'PENDING' | 'REMOVED' | 'REVOKED' | 'EXPIRED'

export interface ProjectMember {
  id: string
  projectId: string
  userId: string
  user: User
  role: Role
  status: MemberStatus
  joinedAt?: string
  invitedAt?: string
}

export interface ChangeRoleRequest {
  role: Role
}


export type InvitationStatus = 'PENDING' | 'ACCEPTED' | 'REVOKED' | 'EXPIRED'

export interface Invitation {
  id: string
  projectId: string
  email: string
  role: Role
  status: InvitationStatus
  invitedBy: string
  expiresAt: string
  createdAt: string
}

export interface SendInvitationRequest {
  email: string
  role: Exclude<Role, 'ADMIN'>
}


export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export interface Task {
  id: string
  projectId: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: string
  createdBy: string
  assignees: User[]
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export interface CreateTaskRequest {
  title: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  dueDate?: string
}

export interface UpdateTaskRequest {
  title?: string
  description?: string
  priority?: TaskPriority
  dueDate?: string | null
  clearDueDate?: boolean
}

export interface ChangeTaskStatusRequest {
  status: TaskStatus
}

export interface AssignUsersRequest {
  userIds: string[]
}

export interface PagedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}


export interface ActivityEvent {
  id: string
  projectId: string
  actorId: string
  actor?: User
  action: string
  entityType: string
  entityId: string
  metadata: Record<string, string>
  createdAt: string
}


export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}
