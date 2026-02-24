import { Query } from "mongoose";
import Tasks, { ITask } from "../models/task";
import ActivityLog from "../models/activityLog";
import { ACTIVITY_ACTIONS } from "../constants/activityConstants";

Tasks.schema.post("save", async function (doc: ITask) {
  if (doc.isNew) {
    await ActivityLog.create({
      task: doc._id,
      action: ACTIVITY_ACTIONS.CREATE_TASK,
      message: `Task created with title "${doc.title}"`,
    });
  }
});

Tasks.schema.pre(
  "findOneAndUpdate",
  async function (this: Query<any, ITask> & { _oldDoc?: ITask }, next: any) {
    const oldDoc = await this.model.findOne(this.getQuery());
    this._oldDoc = oldDoc || undefined;
    next();
  },
);

Tasks.schema.post(
  "findOneAndUpdate",
  async function (
    this: Query<any, ITask> & { _oldDoc?: ITask },
    doc: ITask | null,
  ) {
    if (!doc || !this._oldDoc) return;

    const oldDoc = this._oldDoc;
    const update = this.getUpdate() as any;

    if (update.title && update.title !== oldDoc.title) {
      await ActivityLog.create({
        task: doc._id,
        action: ACTIVITY_ACTIONS.UPDATE_TASK,
        message: `Title changed to "${update.title}"`,
      });
    }

    if (update.description && update.description !== oldDoc.description) {
      await ActivityLog.create({
        task: doc._id,
        action: ACTIVITY_ACTIONS.UPDATE_TASK,
        message: `Description changed to "${update.description}"`,
      });
    }

    if (update.priority && update.priority !== oldDoc.priority) {
      await ActivityLog.create({
        task: doc._id,
        action: ACTIVITY_ACTIONS.UPDATE_TASK,
        message: `Priority changed to "${update.priority}"`,
      });
    }

    if (update.status && update.status !== oldDoc.status) {
      await ActivityLog.create({
        task: doc._id,
        action: ACTIVITY_ACTIONS.UPDATE_TASK,
        message: `Status changed to "${update.status}"`,
      });
    }
  },
);

Tasks.schema.post("findOneAndDelete", async function (doc: ITask | null) {
  if (!doc) return;

  await ActivityLog.create({
    task: doc._id,
    action: ACTIVITY_ACTIONS.DELETE_TASK,
    message: `Task "${doc.title}" was deleted`,
  });
});
