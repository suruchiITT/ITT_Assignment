import { Request, Response } from "express";
import {
  createTaskService,
  getTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
  changeStatusService,
} from "../services/taskService";

export const createTask = async (req: any, res: Response) => {
  const task = await createTaskService(req.body, req.user.id);
  res.status(201).json({ success: true, data: task });
};

export const getTasks = async (req: any, res: Response) => {
  const tasks = await getTasksService(req.user.id, req.query);
  res.status(200).json({ success: true, data: tasks });
};

export const getTaskById = async (req: any, res: Response) => {
  const task = await getTaskByIdService(req.params.id, req.user.id);
  res.status(200).json({ success: true, data: task });
};

export const updateTask = async (req: any, res: Response) => {
  const task = await updateTaskService(req.params.id, req.body, req.user.id);
  res.status(200).json({ success: true, data: task });
};

export const deleteTask = async (req: any, res: Response) => {
  await deleteTaskService(req.params.id, req.user.id);
  res.status(200).json({ success: true, message: "Task deleted" });
};

export const changeStatus = async (req: any, res: Response) => {
  const task = await changeStatusService(
    req.params.id,
    req.body.status,
    req.user.id,
  );
  res.status(200).json({ success: true, data: task });
};
