import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateMiddleware } from "../middlewares/validateMiddleware";
import {
  createTaskValidation,
  updateTaskValidation,
  changeStatusValidation,
} from "../validations/taskValidation";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  changeStatus,
} from "../controllers/taskController";

const router = Router();

router.use(authMiddleware);

router.post("/tasks", validateMiddleware(createTaskValidation), createTask);

router.get("/tasks", getTasks);

router.get("/tasks/:id", getTaskById);

router.put("/tasks/:id", validateMiddleware(updateTaskValidation), updateTask);

router.patch(
  "/tasks/:id/status",
  validateMiddleware(changeStatusValidation),
  changeStatus,
);

router.delete("/tasks/:id", deleteTask);

export default router;
