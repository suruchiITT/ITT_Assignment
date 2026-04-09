import { Schema, model, Document, Types } from 'mongoose';

export type InvitationRole = 'REPORTER' | 'REPORTEE';
export type InvitationStatus = 'PENDING' | 'ACCEPTED' | 'REVOKED' | 'EXPIRED';

export interface IInvitation extends Document {
  _id: Types.ObjectId;
  projectId: Types.ObjectId;
  email: string;
  role: InvitationRole;
  token: string;
  status: InvitationStatus;
  invitedBy: Types.ObjectId;
  expiresAt: Date;
  createdAt: Date;
}

const invitationSchema = new Schema<IInvitation>({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  role: { type: String, enum: ['REPORTER', 'REPORTEE'], required: true },
  token: { type: String, required: true, unique: true },
  status: { type: String, enum: ['PENDING', 'ACCEPTED', 'REVOKED', 'EXPIRED'], default: 'PENDING' },
  invitedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  expiresAt: { type: Date, required: true },
}, { timestamps: { createdAt: 'createdAt', updatedAt: false } });

invitationSchema.index({ projectId: 1 });
invitationSchema.index({ projectId: 1, email: 1, status: 1 });

invitationSchema.set('toJSON', {
  transform(doc: any, ret: any) {
    ret.id = ret._id.toString();
    ret.projectId = ret.projectId?.toString?.() ?? ret.projectId;
    ret.invitedBy = ret.invitedBy?.toString?.() ?? ret.invitedBy;
    delete ret._id;
    delete ret.__v;
    delete ret.token;
    return ret;
  },
});

export default model<IInvitation>('Invitation', invitationSchema);
