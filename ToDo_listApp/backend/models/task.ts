import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { TASK_PRIORITY, TASK_STATUS } from "../constants/taskConstants";

export interface ITask extends Document {
  id: string;
  title: string;
  description?: string;
  priority: (typeof TASK_PRIORITY)[keyof typeof TASK_PRIORITY];
  status: (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
  dueDate: Date;
  user: mongoose.Types.ObjectId;
}

const taskSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      default: uuidv4,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    priority: {
      type: String,
      enum: Object.values(TASK_PRIORITY),
      default: TASK_PRIORITY.MEDIUM,
    },
    status: {
      type: String,
      enum: Object.values(TASK_STATUS),
      default: TASK_STATUS.TODO,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Tasks", taskSchema);