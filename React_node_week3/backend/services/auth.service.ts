import User from "../models/User";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

const registerUser = async (
    username: string,
    email: string,
    password: string,
    profilePic?: string
) => {

    if (!username || !email || !password) {
        throw new Error("All required fields must be provided");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[@$!%*#?&]).{6,}$/;

    if (!passwordRegex.test(password)) {
        throw new Error(
            "Password must contain at least 1 letter, 1 special character, and minimum 6 characters"
        );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        profilePic
    });

    const token = generateToken(user._id.toString());

    return { user, token };

};


const loginUser = async (email: string, password: string) => {

    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken(user._id.toString());

    return { user, token };

};


export {
    registerUser,
    loginUser
};
