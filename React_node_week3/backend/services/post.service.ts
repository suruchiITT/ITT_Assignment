import Post from "../models/Post";
import User from "../models/User";

const createPost = async (
  userId: string,
  title: string,
  content: string,
  image?: string
) => {

  const post = await Post.create({
    author: userId,
    title,
    content,
    image
  });

  return await Post.findById(post._id)
    .populate(
      "author",
      "_id username email profilePic"
    );

};

const getFeed = async (userId: string) => {

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const posts = await Post.find({
    author: { $in: [...user.following, userId] }
  })
    .populate(
      "author",
      "_id username email profilePic"
    )
    .sort({ createdAt: -1 });

  return posts;

};

const getPostById = async (postId: string) => {

  const post = await Post.findById(postId)
    .populate(
      "author",
      "_id username email profilePic"
    );

  if (!post) {
    throw new Error("Post not found");
  }

  return post;

};

const updatePost = async (
  postId: string,
  title: string,
  content: string
) => {

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      title,
      content
    },
    { new: true }
  ).populate(
    "author",
    "_id username email profilePic"
  );

  if (!post) {
    throw new Error("Post not found");
  }

  return post;

};

const deletePost = async (postId: string) => {

  const post = await Post.findByIdAndDelete(postId);

  if (!post) {
    throw new Error("Post not found");
  }

};

export {
  createPost,
  getFeed,
  getPostById,
  updatePost,
  deletePost
};
