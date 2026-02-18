import { Request, Response } from "express";

import {
  createPost as createPostService,
  getFeed as getFeedService,
  getPostById as getPostByIdService,
  updatePost as updatePostService,
  deletePost as deletePostService,
} from "../services/post.service";

export const createPost = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const post = await createPostService(
      userId,
      req.body.title,
      req.body.content,
      req.file?.path,
    );
    res.status(201).json(post);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeed = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const feed = await getFeedService(userId);
    res.json(feed);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const post = await getPostByIdService(postId as string);
    res.json(post);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const updatedPost = await updatePostService(
      postId as string,
      req.body.title,
      req.body.content,
    );
    res.json(updatedPost);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    await deletePostService(postId as string);
    res.json({ message: "Post deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
