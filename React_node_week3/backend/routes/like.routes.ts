import express from "express";

import { likePost, unlikePost } from "../controllers/likePostController";

import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/posts/:postId/like", authenticate, likePost);

router.delete("/posts/:postId/like", authenticate, unlikePost);

export default router;
