import express from "express";

import upload from "../config/multer";

import { authenticate } from "../middleware/auth.middleware";

import { authorizePostOwner } from "../middleware/authorization.middleware";

import {
  getFeed,
  createPost,
  getPostById,
  updatePost,
  deletePost
} from "../controllers/post.controller";

const router = express.Router();

router.get("/posts/feed", authenticate, getFeed);

router.post("/posts", authenticate, upload.single("image"), createPost);

router.get("/posts/:id", authenticate, getPostById);

router.put("/posts/:id", authenticate, authorizePostOwner, updatePost);

router.delete("/posts/:id", authenticate, authorizePostOwner, deletePost);

export default router;


