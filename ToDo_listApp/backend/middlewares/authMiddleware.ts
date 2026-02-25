import { Request, Response, NextFunction } from "express";
import Users from "../models/user";
import { verifyToken } from "../utils/jwtUtils";

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Token missing",
    });

  try {
    const currentUser = verifyToken(token);

    const user = await Users.findOne({ id: currentUser.id });

    if (!user)
      return res.status(401).json({
        success: false,
        message: "User not found",
      });

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
