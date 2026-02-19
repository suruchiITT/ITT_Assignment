import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPost extends Document {
  _id: mongoose.Types.ObjectId;

  author: mongoose.Types.ObjectId;

  title: string;

  content: string;

  image?: string | null;

  likes: mongoose.Types.ObjectId[];

  comments: {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    text: string;
    createdAt: Date;
  }[];

  createdAt: Date;

  updatedAt: Date;
}

const PostSchema: Schema<IPost> = new Schema<IPost>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: null,
    },
  },

  {
    timestamps: true,
  },
);

const Posts: Model<IPost> = mongoose.model<IPost>("Posts", PostSchema);

export default Posts;
