import Project, { IProject } from '../models/Project';
import ProjectMember, { IProjectMember, MemberRole } from '../models/ProjectMember';
import Task from '../models/Task';
import AppError from '../utils/AppError';
import logActivity from '../utils/activityLogger';

export interface ProjectResponse {
  id: string;
  name: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  myRole: MemberRole | null;
  taskCount: number | null;
}

interface CreateProjectInput {
  name: string;
}

function toProjectResponse(
  project: IProject,
  myRole: MemberRole | null | undefined,
  taskCount: number | null = null
): ProjectResponse {
  return {
    id: project._id.toString(),
    name: project.name,
    createdBy: project.createdBy.toString(),
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    myRole: myRole || null,
    taskCount: taskCount ?? null,
  };
}

export async function listMyProjects(userId: string): Promise<ProjectResponse[]> {
  const memberships = await ProjectMember.find({ userId, status: 'ACTIVE' });
  const roleMap = new Map(memberships.map((m) => [m.projectId.toString(), m.role]));
  const projectIds = memberships.map((m) => m.projectId);

  const projects = await Project.find({ _id: { $in: projectIds }, deletedAt: null });

  return Promise.all(
    projects.map(async (p) => {
      const taskCount = await Task.countDocuments({ projectId: p._id, deletedAt: null });
      return toProjectResponse(p, roleMap.get(p._id.toString()), taskCount);
    })
  );
}

export async function createProject(userId: string, data: CreateProjectInput): Promise<ProjectResponse> {
  const project = await Project.create({ name: data.name, createdBy: userId });

  await ProjectMember.create({
    projectId: project._id,
    userId,
    role: 'ADMIN' as MemberRole,
    status: 'ACTIVE',
    joinedAt: new Date(),
  });

  logActivity(project._id.toString(), userId, 'PROJECT_CREATED', 'PROJECT', project._id.toString(), {
    name: data.name,
  });

  return toProjectResponse(project, 'ADMIN', 0);
}

export async function getProject(projectId: string, userId: string): Promise<ProjectResponse> {
  const project = await Project.findOne({ _id: projectId, deletedAt: null });
  if (!project) {
    throw AppError.notFound('Project not found');
  }

  const member = await ProjectMember.findOne({ projectId, userId, status: 'ACTIVE' });
  const taskCount = await Task.countDocuments({ projectId, deletedAt: null });

  return toProjectResponse(project, member?.role || null, taskCount);
}

export async function deleteProject(projectId: string, userId: string): Promise<void> {
  const project = await Project.findOne({ _id: projectId, deletedAt: null });
  if (!project) {
    throw AppError.notFound('Project not found');
  }

  await Project.updateOne({ _id: projectId }, { deletedAt: new Date() });
  logActivity(projectId, userId, 'PROJECT_DELETED', 'PROJECT', projectId, { name: project.name });
}
