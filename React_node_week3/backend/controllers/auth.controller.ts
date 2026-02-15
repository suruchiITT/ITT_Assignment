import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

const register = async (req: Request, res: Response) => {

    try {

        const { username, email, password } = req.body;

        const profilePic = req.file ? req.file.path : "";

        const result = await registerUser(
            username,
            email,
            password,
            profilePic
        );

        res.status(201).json(result);

    }
    catch (error: any) {

        res.status(400).json({ message: error.message });

    }

};


const login = async (req: Request, res: Response) => {

    try {

        const result = await loginUser(
            req.body.email,
            req.body.password
        );

        res.json(result);

    }
    catch (error: any) {

        res.status(400).json({ message: error.message });

    }

};

export {
    register,
    login
};
