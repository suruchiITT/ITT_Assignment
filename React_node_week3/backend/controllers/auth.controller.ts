import { Request, Response } from "express";

import { registerUser, loginUser } from "../services/auth.service";

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const profilePic = req.file ? req.file.path : "";

    const result = await registerUser(username, email, password, profilePic);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body.email, req.body.password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

export { register, login };
