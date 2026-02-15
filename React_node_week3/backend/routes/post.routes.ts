import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
    createPost,
    getFeed,
    updatePost,
    deletePost
} from "../services/post.service";

const router = express.Router();

router.post("/posts", authenticate, async (req, res) => {

    const post = await createPost(
        (req as any).user._id,
        req.body.title,
        req.body.content
    );

    res.json(post);

});


router.get("/posts/feed", authenticate, async (req, res) => {

    const feed = await getFeed(
        (req as any).user._id
    );

    res.json(feed);

});


router.put("/posts/:id", authenticate, async (req, res) => {

    const post = await updatePost(
        req.params.id as string,
        (req as any).user._id,
        req.body.title,
        req.body.content
    );

    res.json(post);

});


router.delete("/posts/:id", authenticate, async (req, res) => {

    await deletePost(
        req.params.id as string,
        (req as any).user._id
    );

    res.json({ message: "Deleted" });

});


export default router;
