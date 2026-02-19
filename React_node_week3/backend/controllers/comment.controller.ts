import { Request, Response } from "express";
import {
  addComment as addCommentService,
  deleteComment as deleteCommentService,
  getComments as getCommentsService,
} from "../services/comment.service";

export const addComment = async (req: Request, res: Response) => {
  try {
    const result = await addCommentService(
      req.params.postId as string,
      (req as any).user._id,
      req.body.text,
    );

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to add comment",
    });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const result = await deleteCommentService(req.params.commentId as string);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to delete comment",
    });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const result = await getCommentsService(req.params.postId as string);

    res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch comments",
    });
  }
};
