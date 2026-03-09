import ActivityLog from "../models/activityLog";
import Tasks from "../models/task";
import Users from "../models/user";

export const createActivityLog = async (
  taskId: string,
  userId: string,
  action: string,
  message: string,
) => {
  try {
    const user = await Users.findOne({ id: userId });
    if (!user) return;

    await ActivityLog.create({
      task: taskId,
      user: user._id,
      action,
      message,
    });
  } catch (error) {
    return;
  }
};

export const getActivityLogsService = async (userId: string, query: any) => {
  try {
    const { page = 1, limit = 50 } = query;
    const userTasks = await Tasks.find({ user: userId }).select("_id");
    const taskIds = userTasks.map((task) => task._id);

    const logs = await ActivityLog.find({ task: { $in: taskIds } })
      .populate({
        path: "user",
        model: "Users",
        select: "name"
      })
      .populate({
        path: "task",
        model: "Tasks",
        select: "title"
      })
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean();

    return logs;
  } catch (error) {
    return [];
  }
};
