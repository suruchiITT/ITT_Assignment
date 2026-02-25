import mongoose, { Schema, Document, Query } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { TASK_PRIORITY, TASK_STATUS } from "../constants/taskConstants";
import ActivityLog from "./activityLog";
import { ACTIVITY_ACTIONS } from "../constants/activityConstants";

export interface ITask extends Document {
  id: string;
  title: string;
  description?: string;
  priority: (typeof TASK_PRIORITY)[keyof typeof TASK_PRIORITY];
  status: (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
  dueDate: Date;
  user: string;
}

const taskSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      default: () => uuidv4(),
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
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

taskSchema.post("save", async function (doc: ITask) {
  await ActivityLog.create({
    task: doc._id,
    action: ACTIVITY_ACTIONS.CREATE_TASK,
    message: `Task created with title "${doc.title}"`,
  });
});

taskSchema.pre(
  "findOneAndUpdate",
  async function (this: Query<any, ITask> & { _oldDoc?: ITask }) {
    const oldDoc = await this.model.findOne(this.getQuery());
    this._oldDoc = oldDoc || undefined;
  },
);
taskSchema.post(
  "findOneAndUpdate",
  async function (
    this: Query<any, ITask> & { _oldDoc?: ITask },
    doc: ITask | null
  ) {
    if (!doc || !this._oldDoc) return;

    const oldDoc = this._oldDoc;
    const rawUpdate = this.getUpdate() as any;
    const update = rawUpdate?.$set || rawUpdate;

    if (update?.title && update.title !== oldDoc.title) {
      await ActivityLog.create({
        task: doc._id,
        action: ACTIVITY_ACTIONS.UPDATE_TASK,
        message: `Title changed to "${update.title}"`,
      });
    }

    if (
      update?.description !== undefined &&
      update.description !== oldDoc.description
    ) {
      await ActivityLog.create({
        task: doc._id,
        action: ACTIVITY_ACTIONS.UPDATE_TASK,
        message: `Description changed`,
      });
    }

    if (update?.status && update.status !== oldDoc.status) {
      await ActivityLog.create({
        task: doc._id,
        action: ACTIVITY_ACTIONS.UPDATE_TASK,
        message: `Status changed to "${update.status}"`,
      });
    }

    if (update?.priority && update.priority !== oldDoc.priority) {
      await ActivityLog.create({
        task: doc._id,
        action: ACTIVITY_ACTIONS.UPDATE_TASK,
        message: `Priority changed to "${update.priority}"`,
      });
    }

    if (
      update?.dueDate &&
      update.dueDate.toString() !== oldDoc.dueDate.toString()
    ) {
      await ActivityLog.create({
        task: doc._id,
        action: ACTIVITY_ACTIONS.UPDATE_TASK,
        message: `Due date changed`,
      });
    }
  }
);

taskSchema.post("findOneAndDelete", async function (doc: ITask | null) {
  if (!doc) return;

  await ActivityLog.create({
    task: doc._id,
    action: ACTIVITY_ACTIONS.DELETE_TASK,
    message: `Task "${doc.title}" was deleted`,
  });
});

export default mongoose.model<ITask>("Tasks", taskSchema);
