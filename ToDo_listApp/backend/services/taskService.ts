import Tasks, { ITask } from "../models/task";

export const createTaskService = async (
  data: Partial<ITask>,
  userId: string,
) => {
  const task = await Tasks.create({ ...data, user: userId });
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
  const task = await Tasks.findOneAndUpdate({ _id: id, user: userId }, data, {
    new: true,
  });
  if (!task) throw { statusCode: 404, message: "Task not found" };
  return task;
};

export const deleteTaskService = async (id: string, userId: string) => {
  const task = await Tasks.findOneAndDelete({
    _id: id,
    user: userId,
  });
  if (!task) throw { statusCode: 404, message: "Task not found" };
};

export const changeStatusService = async (
  id: string,
  status: string,
  userId: string,
) => {
  const task = await Tasks.findOneAndUpdate(
    { _id: id, user: userId },
    { status },
    { new: true },
  );
  if (!task) throw { statusCode: 404, message: "Task not found" };
  return task;
};
