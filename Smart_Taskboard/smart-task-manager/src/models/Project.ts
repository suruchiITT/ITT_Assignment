import { Schema, model, Document, Types } from 'mongoose';

export interface IProject extends Document {
  _id: Types.ObjectId;
  name: string;
  createdBy: Types.ObjectId;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true, trim: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  deletedAt: { type: Date, default: null },
}, { timestamps: true });

projectSchema.index({ createdBy: 1 });

projectSchema.set('toJSON', {
  transform(doc: any, ret: any) {
    ret.id = ret._id.toString();
    ret.createdBy = ret.createdBy?.toString?.() ?? ret.createdBy;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default model<IProject>('Project', projectSchema);
