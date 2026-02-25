import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    id: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },

    name: {
      type: String,
      required: true, 
      trim: true,
    },

    email: {
      type: String,
      required: true, 
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true, 
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model<IUser>("Users", userSchema);

export default Users;