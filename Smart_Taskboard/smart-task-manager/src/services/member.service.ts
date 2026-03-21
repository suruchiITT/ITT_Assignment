import ProjectMember, { IProjectMember, MemberRole } from '../models/ProjectMember';
import User from '../models/User';
import AppError from '../utils/AppError';
import logActivity from '../utils/activityLogger';
import { publishMemberEvent, WS_EVENTS } from '../utils/eventPublisher';
import { sendRemovalNotificationEmail } from '../utils/emailService';
import Project from '../models/Project';

export interface MemberResponse {
  id: string;
  projectId: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
  } | null;
  role: MemberRole;
  status: string;
  joinedAt: Date | null;
  invitedAt: Date | null;
}

async function toMemberResponse(member: IProjectMember, user: any): Promise<MemberResponse> {
  return {
    id: member._id.toString(),
    projectId: member.projectId.toString(),
    userId: member.userId.toString(),
    user: user
      ? { id: user._id.toString(), name: user.name, email: user.email, avatarUrl: user.avatarUrl || null }
      : null,
    role: member.role,
    status: member.status,
    joinedAt: member.joinedAt || null,
    invitedAt: member.invitedAt || null,
  };
}

export async function listMembers(projectId: string): Promise<MemberResponse[]> {
  const members = await ProjectMember.find({
    projectId,
    status: { $in: ['ACTIVE', 'PENDING'] },
  });

  const userIds = [...new Set(members.map((m) => m.userId.toString()))];
  const users = await User.find({ _id: { $in: userIds } });
  const userMap = new Map(users.map((u) => [u._id.toString(), u]));

  return Promise.all(members.map((m) => toMemberResponse(m, userMap.get(m.userId.toString()))));
}

interface ChangeMemberRoleInput {
  role: MemberRole;
}

export async function changeMemberRole(
  projectId: string,
  targetUserId: string,
  actorId: string,
  data: ChangeMemberRoleInput
): Promise<MemberResponse> {
  const member = await ProjectMember.findOne({ projectId, userId: targetUserId, status: 'ACTIVE' });
  if (!member) {
    throw AppError.notFound('Member not found in this project');
  }

  if (member.role === 'ADMIN' && data.role !== 'ADMIN') {
    const adminCount = await ProjectMember.countDocuments({ projectId, role: 'ADMIN', status: 'ACTIVE' });
    if (adminCount <= 1) {
      throw AppError.conflict('Cannot change role: this member is the last admin');
    }
  }

  const oldRole = member.role;
  member.role = data.role;
  await member.save();

  const user = await User.findById(targetUserId);
  const response = await toMemberResponse(member, user);

  publishMemberEvent(projectId, WS_EVENTS.MEMBER_ROLE_CHANGED, { userId: targetUserId, newRole: data.role });
  logActivity(projectId, actorId, 'MEMBER_ROLE_CHANGED', 'MEMBER', targetUserId, {
    from: oldRole,
    to: data.role,
    userName: user?.name,
  });

  return response;
}

export async function removeMember(projectId: string, targetUserId: string, actorId: string): Promise<void> {
  const member = await ProjectMember.findOne({ projectId, userId: targetUserId, status: 'ACTIVE' });
  if (!member) {
    throw AppError.notFound('Member not found in this project');
  }

  if (member.role === 'ADMIN') {
    const adminCount = await ProjectMember.countDocuments({ projectId, role: 'ADMIN', status: 'ACTIVE' });
    if (adminCount <= 1) {
      throw AppError.conflict('Cannot remove the last admin from a project');
    }
  }

  await ProjectMember.updateOne({ _id: member._id }, { status: 'REMOVED' });

  const user = await User.findById(targetUserId);
  if (user) {
    const project = await Project.findById(projectId);
    sendRemovalNotificationEmail(user.email, project?.name || 'the project');
  }

  publishMemberEvent(projectId, WS_EVENTS.MEMBER_REMOVED, { userId: targetUserId });
  logActivity(projectId, actorId, 'MEMBER_REMOVED', 'MEMBER', targetUserId, {
    userName: user?.name,
  });
}
