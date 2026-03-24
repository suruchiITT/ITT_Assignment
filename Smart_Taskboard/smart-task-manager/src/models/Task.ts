import { Schema, model, Document, Types } from "mongoose";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface IAssignee {
  userId: Types.ObjectId;
  assignedBy: Types.ObjectId;
  assignedAt: Date;
}

export interface ITask extends Document {
  _id: Types.ObjectId;
  projectId: Types.ObjectId;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;
  createdBy: Types.ObjectId;
  assignees: IAssignee[];
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const assigneeSchema = new Schema<IAssignee>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignedBy: { type: Schema.Types.ObjectId, ref: "User" },
    assignedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const taskSchema = new Schema<ITask>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    title: { type: String, required: true, trim: true, maxlength: 255 },
    description: { type: String, maxlength: 5000, default: null },
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "DONE"],
      default: "TODO",
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
      default: "MEDIUM",
    },
    dueDate: { type: Date, default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignees: { type: [assigneeSchema], default: [] },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

taskSchema.index({ projectId: 1, status: 1, deletedAt: 1 });
taskSchema.index({ projectId: 1, "assignees.userId": 1, deletedAt: 1 });

taskSchema.set("toJSON", {
  transform(doc: any, ret: any) {
    ret.id = ret._id.toString();
    ret.projectId = ret.projectId?.toString?.() ?? ret.projectId;
    ret.createdBy = ret.createdBy?.toString?.() ?? ret.createdBy;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default model<ITask>("Task", taskSchema);
