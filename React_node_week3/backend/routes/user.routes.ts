import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import uploadProfilePic from "../middleware/upload.middleware";
import {
    getProfile,
    updateProfile,
    getAllUsers,
    followUser,
    getFollowing,
    getFollowers,
    unfollowUser
} from "../services/user.service";

const router = express.Router();

router.get("/profile", authenticate, async (req, res) => {

    const user = await getProfile(
        (req as any).user._id
    );

    res.json(user);

});

router.put("/profile", authenticate, uploadProfilePic.single("profilePic"), async (req, res) => {

    const file = (req as any).file;

    const profilePic = file
        ? `/uploads/profiles/${file.filename}`
        : undefined;

    const user = await updateProfile(
        (req as any).user._id,
        req.body.username,
        profilePic
    );

    res.json(user);

});

router.get("/users", authenticate, async (req, res) => {

    const users = await getAllUsers(req,res);
    
    res.json(users);

});

router.post("/follow/:id", authenticate, async (req, res) => {

    await followUser(
        (req as any).user._id,
        req.params.id as string
    );

    res.json({ message: "Followed" });

});

router.delete("/follow/:id", authenticate, async (req, res) => {

    await unfollowUser(
        (req as any).user._id,
        req.params.id as string
    );

    res.json({ message: "Unfollowed" });

});

router.get(

    "/following",

    authenticate,

    async (req, res) => {

        const following =
        await getFollowing(

            (req as any).user._id

        );

        res.json(following);

    }

);



router.get(

    "/followers",

    authenticate,

    async (req, res) => {

        const followers =
        await getFollowers(

            (req as any).user._id

        );

        res.json(followers);

    }

);




export default router;