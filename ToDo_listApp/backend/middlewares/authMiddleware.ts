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
    return res.status(401).json({ success: false, message: "Token missing" });

  try {
    const decoded = verifyToken(token);
    const user = await Users.findById(decoded.id);

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    req.user = user;
    next();
  } catch {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
