import { Router } from "express";
import { signup, login } from "../controllers/authController";

const router = Router();

router.post("/user/signup", signup);
router.post("/user/login", login);

export default router;
