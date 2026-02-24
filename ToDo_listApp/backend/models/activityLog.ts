import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { ACTIVITY_ACTIONS } from "../constants/activityConstants";

export interface IActivityLog extends Document {
  id: string;
  task: mongoose.Types.ObjectId;
  action: (typeof ACTIVITY_ACTIONS)[keyof typeof ACTIVITY_ACTIONS];
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const activityLogSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      default: uuidv4,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tasks",
      required: true,
    },
    action: {
      type: String,
      enum: Object.values(ACTIVITY_ACTIONS),
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IActivityLog>("ActivityLog", activityLogSchema);
