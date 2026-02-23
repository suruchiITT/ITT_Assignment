import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IActivityLog extends Document {
  id: string;
  post?: mongoose.Types.ObjectId;
  action: "CREATE_TASK" | "UPDATE_TASK" | "DELETE_TASK" | "CHANGE_STATUS";
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const activityLogSchema: Schema<IActivityLog> = new Schema(
  {
    id: {
      type: String,
      unique: true,
      default: uuidv4(),
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
    },

    action: {
      type: String,
      enum: ["CREATE_TASK", "UPDATE_TASK", "DELETE_TASK", "CHANGE_STATUS"],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ActivityLog = mongoose.model<IActivityLog>( "ActivityLog", activityLogSchema,);

export default ActivityLog;
