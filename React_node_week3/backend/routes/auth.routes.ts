import express from "express";

import upload from "../config/multer";

import { register, login } from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", upload.single("profilePic"), register);

router.post("/login", login);

export default router;
