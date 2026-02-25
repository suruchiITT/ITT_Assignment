import Users from "../models/user";
import { hashPassword, comparePassword } from "../utils/bcryptUtils";
import { generateToken } from "../utils/jwtUtils";

export const signupService = async (
  name: string,
  email: string,
  password: string,
) => {
  if (!name || !email || !password)
    throw { statusCode: 400, message: "All fields are required" };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    throw { statusCode: 400, message: "Invalid email format" };

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!passwordRegex.test(password))
    throw {
      statusCode: 400,
      message:
        "Password must be at least 6 characters at least 1 letter and 1 special character",
    };

  email = email.toLowerCase().trim();

  const existingUser = await Users.findOne({ email });
  if (existingUser)
    throw { statusCode: 400, message: "Email already registered" };

  const hashedPassword = await hashPassword(password);

  await Users.create({
    name,
    email,
    password: hashedPassword,
  });

  return { message: "User registered successfully" };
};

export const loginService = async (email: string, password: string) => {
  if (!email || !password)
    throw { statusCode: 400, message: "All fields are required" };

  email = email.toLowerCase().trim();

  const user = await Users.findOne({ email });
  if (!user) throw { statusCode: 400, message: "Invalid email or password" };

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw { statusCode: 400, message: "Invalid email or password" };

  const token = generateToken(user.id);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};
