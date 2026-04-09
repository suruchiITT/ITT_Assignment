import { Schema, model, Document, Types } from 'mongoose';

export interface IActivityLog extends Document {
  _id: Types.ObjectId;
  projectId: Types.ObjectId;
  actorId: Types.ObjectId;
  action: string;
  entityType: string;
  entityId: string;
  metadata: Record<string, any>;
  createdAt: Date;
}

const activityLogSchema = new Schema<IActivityLog>({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  actorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  entityType: { type: String, required: true },
  entityId: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: { createdAt: 'createdAt', updatedAt: false } });

activityLogSchema.index({ projectId: 1, createdAt: -1 });
activityLogSchema.index({ projectId: 1, actorId: 1 });

activityLogSchema.set('toJSON', {
  transform(doc: any, ret: any) {
    ret.id = ret._id.toString();
    ret.projectId = ret.projectId?.toString?.() ?? ret.projectId;
    ret.actorId = ret.actorId?.toString?.() ?? ret.actorId;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default model<IActivityLog>('ActivityLog', activityLogSchema);
