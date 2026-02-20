import { verifyToken } from "../utils/jwt";
import User from "../models/User";
import NodeCache from "node-cache";

const userCache = new NodeCache({ stdTTL: 3600 });

export const authenticate = async (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token not provided" });
    }

    const currentUser: any = verifyToken(token);

    let user = userCache.get(currentUser.userId);

    if (!user) {
      user = await User.findById(currentUser.userId);

      if (!user) {
        return res
          .status(401)
          .json({ message: "User not found or token invalid" });
      }

      userCache.set(currentUser.userId, user);
    }

    req.user = user;

    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized access" });
  }
};
