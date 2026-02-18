import { Request, Response } from "express";

import {
  getProfile as getProfileService,
  updateProfile as updateProfileService,
  getAllUsers as getAllUsersService,
  getUserById as getUserByIdService,
  followUser as followUserService,
  unfollowUser as unfollowUserService,
  getFollowers as getFollowersService,
  getFollowing as getFollowingService,
} from "../services/user.service";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const user = await getProfileService(userId);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const profilePic = req.file?.path;
    const updatedUser = await updateProfileService(
      userId,
      req.body.username,
      profilePic,
    );
    res.json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const currentUserId = (req as any).user._id;
    const users = await getAllUsersService(currentUserId);
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await getUserByIdService(userId as string);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const followUser = async (req: Request, res: Response) => {
  try {
    const currentUserId = (req as any).user._id;
    const targetUserId = req.params.userId;
    await followUserService(currentUserId, targetUserId as string);
    res.json({ message: "User followed successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const unfollowUser = async (req: Request, res: Response) => {
  try {
    const currentUserId = (req as any).user._id;
    const targetUserId = req.params.userId;
    await unfollowUserService(currentUserId, targetUserId as string);
    res.json({ message: "User unfollowed successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getFollowers = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const followers = await getFollowersService(userId as string);
    res.json(followers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getFollowing = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const following = await getFollowingService(userId);
    res.json(following);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
