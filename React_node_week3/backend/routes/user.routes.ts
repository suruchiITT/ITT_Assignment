import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
    getProfile,
    updateProfile,
    getAllUsers,
    followUser,
    unfollowUser
} from "../services/user.service";

const router = express.Router();


router.get("/profile", authenticate, async (req, res) => {

    const user = await getProfile(
        (req as any).user._id
    );

    res.json(user);

});


router.put("/profile", authenticate, async (req, res) => {

    const user = await updateProfile(
        (req as any).user._id,
        req.body.username
    );

    res.json(user);

});


router.get("/users", authenticate, async (req, res) => {

    const users = await getAllUsers();

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


export default router;
