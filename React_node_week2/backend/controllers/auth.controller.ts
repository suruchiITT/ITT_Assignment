import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { UserModel } from "../models/User.js";

export const registerAccount = async (request: Request, response: Response) => {
  const { fullName, emailAddress, passwordValue } = request.body;

  if (!emailAddress || !passwordValue) {
    return response.status(400).json({ message: "Missing data" });
  }

  const existingUser = await UserModel.findOne({ emailAddress });

  if (existingUser) {
    return response.status(400).json({ message: "Email already exists" });
  }

  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{7,}$/;

  if (!passwordPattern.test(passwordValue)) {
    return response.status(400).json({ message: "Weak password" });
  }

  const encryptedPassword = await bcrypt.hash(passwordValue, 10);

  const createdUser = await UserModel.create({
    fullName,
    emailAddress,
    hashedPassword: encryptedPassword
  });

  response.json(createdUser);
};

export const loginAccount = async (request: Request, response: Response) => {
  const { emailAddress, passwordValue } = request.body;

  if (!emailAddress || !passwordValue) {
    return response.status(400).json({ message: "Missing credentials" });
  }

  const foundUser = await UserModel.findOne({ emailAddress });

  if (!foundUser || !foundUser.hashedPassword) {
    return response.status(400).json({ message: "Invalid credentials" });
  }

  const passwordMatched = await bcrypt.compare(
    passwordValue,
    foundUser.hashedPassword
  );

  if (!passwordMatched) {
    return response.status(400).json({ message: "Invalid credentials" });
  }

  const accessToken = jwt.sign(
    { id: foundUser._id.toString() },
    process.env.JWT_SECRET as string
  );

  response.json({ token: accessToken });
};
