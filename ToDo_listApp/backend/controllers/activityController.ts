import { Request, Response } from "express";
import { getActivityLogsService } from "../services/activityService";

export const getActivityLogs = async (req: any, res: Response) => {
  const logs = await getActivityLogsService(req.user.id, req.query);

  res.status(200).json({
    success: true,
    data: logs,
  });
};
