import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComment extends Document {
  _id: mongoose.Types.ObjectId;

  user: mongoose.Types.ObjectId;

  post: mongoose.Types.ObjectId;

  text: string;

  createdAt: Date;

  updatedAt: Date;
}

const CommentSchema: Schema<IComment> = new Schema<IComment>(
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

    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Comments: Model<IComment> = mongoose.model<IComment>(
  "Comments",
  CommentSchema,
);

export default Comments;
