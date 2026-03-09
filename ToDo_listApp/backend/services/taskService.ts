import Tasks, { ITask } from "../models/task";
import { createActivityLog } from "./activityService";
import { ACTIVITY_ACTIONS } from "../constants/activityConstants";

export const createTaskService = async (
  data: Partial<ITask>,
  userId: string,
) => {
  const task = await Tasks.create({ ...data, user: userId });

  await createActivityLog(
    task._id.toString(),
    userId,
    ACTIVITY_ACTIONS.CREATE_TASK,
    `Created task: "${task.title}"`
  );

  return task;
};

export const getTasksService = async (userId: string, query: any) => {
  const { priority, status, dueDate, page = 1, limit = 10 } = query;

  const filter: any = { user: userId };

  if (priority) filter.priority = priority;
  if (status) filter.status = status;
  if (dueDate) filter.dueDate = dueDate;

  const tasks = await Tasks.find(filter)
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  return tasks;
};

export const getTaskByIdService = async (id: string, userId: string) => {
  const task = await Tasks.findOne({ _id: id, user: userId });
  if (!task) throw { statusCode: 404, message: "Task not found" };
  return task;
};

export const updateTaskService = async (
  id: string,
  data: Partial<ITask>,
  userId: string,
) => {
  const oldTask = await Tasks.findOne({ _id: id, user: userId });
  if (!oldTask) throw { statusCode: 404, message: "Task not found" };

  const task = await Tasks.findOneAndUpdate({ _id: id, user: userId }, data, {
    new: true,
  });

  if (task) {
    if (data.title && data.title !== oldTask.title) {
      await createActivityLog(id, userId, ACTIVITY_ACTIONS.UPDATE_TASK, `Title changed to "${data.title}"`);
    }
    if (data.description !== undefined && data.description !== oldTask.description) {
      await createActivityLog(id, userId, ACTIVITY_ACTIONS.UPDATE_TASK, `Description updated`);
    }
    if (data.status && data.status !== oldTask.status) {
      await createActivityLog(id, userId, ACTIVITY_ACTIONS.UPDATE_TASK, `Status changed from ${oldTask.status} to ${data.status}`);
    }
    if (data.priority && data.priority !== oldTask.priority) {
      await createActivityLog(id, userId, ACTIVITY_ACTIONS.UPDATE_TASK, `Priority changed to ${data.priority}`);
    }
    if (data.dueDate && data.dueDate.toString() !== oldTask.dueDate.toString()) {
      await createActivityLog(id, userId, ACTIVITY_ACTIONS.UPDATE_TASK, `Due date changed`);
    }
  }

  return task;
};

export const deleteTaskService = async (id: string, userId: string) => {
  const task = await Tasks.findOne({ _id: id, user: userId });
  if (!task) throw { statusCode: 404, message: "Task not found" };

  const taskTitle = task.title;
  await Tasks.deleteOne({ _id: id, user: userId });

  await createActivityLog(
    id,
    userId,
    ACTIVITY_ACTIONS.DELETE_TASK,
    `Deleted task: "${taskTitle}"`
  );
};

export const changeStatusService = async (
  id: string,
  status: string,
  userId: string,
) => {
  const oldTask = await Tasks.findOne({ _id: id, user: userId });
  if (!oldTask) throw { statusCode: 404, message: "Task not found" };

  const task = await Tasks.findOneAndUpdate(
    { _id: id, user: userId },
    { status },
    { new: true },
  );

  if (task) {
    await createActivityLog(
      id,
      userId,
      ACTIVITY_ACTIONS.UPDATE_TASK,
      `Status changed from ${oldTask.status} to ${status}`
    );
  }

  return task;
};
