import express from "express";

import {

    authenticate

} from "../middleware/auth.middleware";

import {

    authorizePostOwner

} from "../middleware/authorization.middleware";

import upload
from "../middleware/upload.middleware";

import {

    createPost,

    getFeed,

    updatePost,

    deletePost,
    getFollowingPosts

} from "../services/post.service";



const router =
express.Router();



// CREATE POST

router.post(

    "/posts",

    authenticate,

    upload.single("image"),

    async (req, res) => {

        const post =
        await createPost(

            (req as any).user._id,

            req.body.title,

            req.body.content,

            req.file?.path

        );



        res.json({

            post

        });

    }

);


router.get(

    "/posts/following",

    authenticate,

    async (req, res) => {

        const page =
        parseInt(req.query.page as string) || 1;

        const limit =
        parseInt(req.query.limit as string) || 10;

        const posts =
        await getFollowingPosts(

            (req as any).user._id,

            page,

            limit

        );

        res.json(posts);

    }

);

// GET FEED

router.get(

    "/posts/feed",

    authenticate,

    async (req, res) => {

        const page =
        parseInt(

            req.query.page as string

        ) || 1;



        const limit =
        parseInt(

            req.query.limit as string

        ) || 10;



        const feed =
        await getFeed(

            (req as any).user._id,

            page,

            limit

        );



        res.json(

            feed.data

        );

    }

);



// UPDATE POST

router.put(

    "/posts/:id",

    authenticate,

    authorizePostOwner,

    async (req, res) => {

        const post =
        await updatePost(

            req.params.id as string,

            (req as any).user._id,

            req.body.title,

            req.body.content

        );



        res.json({

            post

        });

    }

);



// DELETE POST

router.delete(

    "/posts/:id",

    authenticate,

    authorizePostOwner,

    async (req, res) => {

        await deletePost(

            req.params.id as string,

            (req as any).user._id

        );



        res.json({

            message:"Deleted"

        });

    }

);



export default router;
