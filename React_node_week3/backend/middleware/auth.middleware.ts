import { verifyToken } from "../utils/jwt";
import User from "../models/User";

export const authenticate = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token" });

    const decoded: any = verifyToken(token);

    const user = await User.findById(decoded.userId);

    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user;

    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};


