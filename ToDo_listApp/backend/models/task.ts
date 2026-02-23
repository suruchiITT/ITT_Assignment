import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface ITask extends Document {
  id: string;
  title: string;
  description?: string;
  priority: "Low" | "Medium" | "High";
  status: "Todo" | "In Progress" | "Done";
  dueDate?: Date;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema: Schema<ITask> = new Schema(
  {
     id: {
      type: String,
      unique: true,
      default: uuidv4(), 
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
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Todo", "In Progress", "Done"],
      default: "Todo",
    },

    dueDate: {
      type: Date,
      required:true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",  
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tasks = mongoose.model<ITask>("Tasks", taskSchema);

export default Tasks;