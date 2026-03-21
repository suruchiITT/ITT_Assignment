import { Schema, model, Document, Types } from 'mongoose';

export type MemberRole = 'ADMIN' | 'REPORTER' | 'REPORTEE';
export type MemberStatus = 'PENDING' | 'ACTIVE' | 'REMOVED' | 'REVOKED' | 'EXPIRED';

export interface IProjectMember extends Document {
  _id: Types.ObjectId;
  projectId: Types.ObjectId;
  userId: Types.ObjectId;
  role: MemberRole;
  status: MemberStatus;
  invitedBy: Types.ObjectId | null;
  invitedAt: Date;
  joinedAt: Date | null;
}

const memberSchema = new Schema<IProjectMember>({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['ADMIN', 'REPORTER', 'REPORTEE'], required: true },
  status: { type: String, enum: ['PENDING', 'ACTIVE', 'REMOVED', 'REVOKED', 'EXPIRED'], default: 'PENDING' },
  invitedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  invitedAt: { type: Date, default: Date.now },
  joinedAt: { type: Date, default: null },
}, { timestamps: false });

memberSchema.index({ projectId: 1, userId: 1 }, { unique: true });
memberSchema.index({ projectId: 1, status: 1 });
memberSchema.index({ userId: 1, status: 1 });

memberSchema.set('toJSON', {
  transform(doc: any, ret: any) {
    ret.id = ret._id.toString();
    ret.projectId = ret.projectId?.toString?.() ?? ret.projectId;
    ret.userId = ret.userId?.toString?.() ?? ret.userId;
    ret.invitedBy = ret.invitedBy?.toString?.() ?? ret.invitedBy;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default model<IProjectMember>('ProjectMember', memberSchema);
