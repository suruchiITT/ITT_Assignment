import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILike extends Document {
  _id: mongoose.Types.ObjectId;

  user: mongoose.Types.ObjectId;

  post: mongoose.Types.ObjectId;

  createdAt: Date;
}

const LikeSchema: Schema<ILike> = new Schema<ILike>(
  {

    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Likes: Model<ILike> = mongoose.model<ILike>("Likes", LikeSchema);

export default Likes;
