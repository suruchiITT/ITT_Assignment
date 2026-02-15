import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (userId: string): string => {
  const token = jwt.sign({ userId },JWT_SECRET,{ expiresIn: "7d" } );
  return token;
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
