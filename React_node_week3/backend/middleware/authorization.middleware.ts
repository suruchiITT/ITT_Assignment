import { Request, Response, NextFunction } from "express";
import Post from "../models/Post";

const authorizePostOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = (req as any).user._id;

        const postId = req.params.id;
        console.log("user id got",user)

        const post = await Post.findById(postId).select("author");

        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });

        }

        if (post.author.toString() !== user._id.toString()) {

            return res.status(403).json({
                message: "Forbidden"
            });

        }

        next();

    }
    catch {

        return res.status(500).json({
            message: "Authorization failed"
        });

    }
};

export {
    authorizePostOwner
};