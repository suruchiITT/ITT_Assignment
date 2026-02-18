import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;

  username: string;

  email: string;

  password: string;

  profilePic?: string | null;

  following: mongoose.Types.ObjectId[];

  followers: mongoose.Types.ObjectId[];

  createdAt: Date;

  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
      default: null,
    },

    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  {
    timestamps: true,
  },
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;