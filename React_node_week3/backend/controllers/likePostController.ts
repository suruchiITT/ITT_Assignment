import { Request, Response } from "express";

import {
  likePost as likePostService,
  unlikePost as unlikePostService,
} from "../services/like.service";

export const likePost = async (req: Request, res: Response) => {
  try {
    const result = await likePostService(
      req.params.postId as string,
      (req as any).user._id,
    );

    res.status(200).json({
      success: true,
      message: "Post liked successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to like post",
    });
  }
};

export const unlikePost = async (req: Request, res: Response) => {
  try {
    const result = await unlikePostService(
      req.params.postId as string,
      (req as any).user._id,
    );

    res.status(200).json({
      success: true,
      message: "Post unliked successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to unlike post",
    });
  }
};
