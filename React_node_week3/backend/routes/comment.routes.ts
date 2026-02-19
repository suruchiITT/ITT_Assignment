import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/comment.controller";
import { authenticate } from "../middleware/auth.middleware";
import { authorizeCommentOwner } from "../middleware/comment.authorization.middleware";

const router = express.Router();

router.get("/posts/:postId/comments", authenticate, getComments);

router.post("/posts/:postId/comments", authenticate, addComment);

router.delete( "/comments/:commentId",authenticate, authorizeCommentOwner, deleteComment);

export default router;
