import { verifyToken } from "../utils/jwt";
import User from "../models/User";

export const authenticate = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token" });

    const currentUser: any = verifyToken(token);

    if (!currentUser) return res.status(401).json({ message: "Invalid token" });

    req.user = currentUser;

    next();
  } catch (error){
    res.status(401).json({ message: "Unauthorized" });
  }
};


