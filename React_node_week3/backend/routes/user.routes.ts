import express from "express";

import { authenticate } from "../middleware/auth.middleware";

import upload from "../config/multer";

import {
  getProfile,
  updateProfile,
  getAllUsers,
  getUserById,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/profile", authenticate, getProfile);

router.put("/profile",authenticate, upload.single("profilePic"),updateProfile);

router.get("/users", authenticate, getAllUsers);

router.get("/users/:id", authenticate, getUserById);

router.post("/follow/:userId", authenticate, followUser);

router.delete("/follow/:userId", authenticate, unfollowUser);

router.get("/followers/:userId", authenticate, getFollowers);

router.get("/following", authenticate, getFollowing);

export default router;
