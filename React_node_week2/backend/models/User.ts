import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
fullName: String,
emailAddress: { type: String, unique: true },
hashedPassword: String
});


export const UserModel = mongoose.model("User", userSchema);