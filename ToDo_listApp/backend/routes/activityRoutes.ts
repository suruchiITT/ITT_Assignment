import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getActivityLogs } from "../controllers/activityController";

const router = Router();

router.use(authMiddleware);

router.get("/activities", getActivityLogs);

export default router;