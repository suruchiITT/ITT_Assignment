import ActivityLog from "../models/activityLog";
import Tasks from "../models/task";
import { ACTIVITY_ACTIONS } from "../constants/activityConstants";

export const createActivityLog = async (
  taskId: string,
  action: string,
  message: string,
) => {
  await ActivityLog.create({
    task: taskId,
    action,
    message,
  });
};

export const getActivityLogsService = async (userId: string, query: any) => {
  const { page = 1, limit = 10 } = query;

  const userTasks = await Tasks.find({ user: userId }).select("_id");
  const taskIds = userTasks.map((task) => task._id);

  const logs = await ActivityLog.find({ task: { $in: taskIds } })
    .populate("task", "title")
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  return logs;
};


