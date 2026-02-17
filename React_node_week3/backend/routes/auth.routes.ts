import express from "express";
import { register, login } from "../controllers/auth.controller";
import upload from "../config/multer";

const router = express.Router();

router.post("/register", upload.single("profilePic"), register);

router.post("/login", login);

export default router;