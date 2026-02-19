import { Request, Response, NextFunction } from "express";
import Comment from "../models/Comment";

export const authorizeCommentOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const commentId = req.params.commentId;
    const userId = (req as any).user._id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this comment"
      });
    }

    next();
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
