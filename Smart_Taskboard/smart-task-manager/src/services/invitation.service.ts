import { v4 as uuidv4 } from 'uuid';
import Invitation, { IInvitation, InvitationRole } from '../models/Invitation';
import ProjectMember from '../models/ProjectMember';
import User from '../models/User';
import Project from '../models/Project';
import AppError from '../utils/AppError';
import logActivity from '../utils/activityLogger';
import { publishMemberEvent, WS_EVENTS } from '../utils/eventPublisher';
import { sendInvitationEmail } from '../utils/emailService';
import env from '../config/env';

interface SendInvitationInput {
  email: string;
  role: InvitationRole;
}

export async function sendInvitation(
  projectId: string,
  actorId: string,
  data: SendInvitationInput
): Promise<any> {
  const normalEmail = data.email.toLowerCase().trim();
  const now = new Date();

 
  if (data.role === 'ADMIN' as any) {
    throw AppError.badRequest('Cannot invite a user as ADMIN. Promote an existing member instead.');
  }

  await Invitation.updateMany(
    {
      projectId,
      email: normalEmail,
      status: 'PENDING',
      expiresAt: { $lt: now },
    },
    {
      status: 'EXPIRED',
    }
  );

  
  const dup = await Invitation.findOne({
    projectId,
    email: normalEmail,
    status: 'PENDING',
    expiresAt: { $gt: now },
  });
  if (dup) {
    throw AppError.conflict('A pending invitation already exists for this email');
  }

 
  const existingUser = await User.findOne({ email: normalEmail });
  if (existingUser) {
    const alreadyMember = await ProjectMember.findOne({
      projectId,
      userId: existingUser._id,
      status: 'ACTIVE',
    });
    if (alreadyMember) {
      throw AppError.conflict('This user is already a member of the project');
    }
  }

  const project = await Project.findById(projectId);
  const actor = await User.findById(actorId);

  const token = uuidv4();
  const expiresAt = new Date(Date.now() + env.invitationExpiryDays * 24 * 60 * 60 * 1000);
  // const expiresAt = new Date(Date.now() + 5 * 1000);


  const invitation = await Invitation.create({
    projectId,
    email: normalEmail,
    role: data.role,
    token,
    invitedBy: actorId,
    expiresAt,
  });

  sendInvitationEmail(normalEmail, project?.name || '', actor?.name || '', data.role, token);
  logActivity(projectId, actorId, 'INVITATION_SENT', 'INVITATION', invitation._id.toString(), {
    email: normalEmail,
    role: data.role,
  });

  return invitation.toJSON();
}

export async function listPendingInvitations(projectId: string): Promise<IInvitation[]> {
  await Invitation.updateMany(
    {
      projectId,
      status: 'PENDING',
      expiresAt: { $lt: new Date() },
    },
    {
      status: 'EXPIRED',
    }
  );

  return Invitation.find({
    projectId,
    status: 'PENDING',
    expiresAt: { $gte: new Date() },
  }).sort({ createdAt: -1 });
}

export async function acceptInvitation(token: string): Promise<string> {
  const invitation = await Invitation.findOne({ token });
  if (!invitation) {
    throw AppError.notFound('Invitation not found');
  }

  if (invitation.expiresAt < new Date()) {
    invitation.status = 'EXPIRED';
    await invitation.save();
    throw AppError.gone('This invitation has expired or has already been used');
  }

  if (invitation.status !== 'PENDING') {
    throw AppError.gone('This invitation has expired or has already been used');
  }

  invitation.status = 'ACCEPTED';
  await invitation.save();

  const user = await User.findOne({ email: invitation.email });
  if (!user) {
    throw AppError.notFound('No account found with this email. Please register first.');
  }

  await ProjectMember.findOneAndUpdate(
    { projectId: invitation.projectId, userId: user._id },
    { role: invitation.role, status: 'ACTIVE', joinedAt: new Date(), invitedBy: invitation.invitedBy },
    { upsert: true, new: true }
  );

  const memberDoc = await ProjectMember.findOne({ projectId: invitation.projectId, userId: user._id });
  publishMemberEvent(invitation.projectId.toString(), WS_EVENTS.MEMBER_JOINED, memberDoc);
  logActivity(invitation.projectId.toString(), user._id.toString(), 'MEMBER_JOINED', 'MEMBER', user._id.toString(), {
    userName: user.name,
    role: invitation.role,
  });

  return 'Invitation accepted. You are now a member of the project.';
}

export async function revokeInvitation(projectId: string, invitationId: string, actorId: string): Promise<void> {
  const invitation = await Invitation.findOne({ _id: invitationId, projectId });
  if (!invitation) {
    throw AppError.notFound('Invitation not found');
  }

  if (invitation.status !== 'PENDING') {
    throw AppError.conflict('Only PENDING invitations can be revoked');
  }

  invitation.status = 'REVOKED';
  await invitation.save();

  logActivity(projectId, actorId, 'INVITATION_REVOKED', 'INVITATION', invitationId, {
    email: invitation.email,
  });
}
