import Like from "../models/Like";

const likePost = async (postId: string, userId: string) => {
  const exists = await Like.findOne({
    post: postId,
    user: userId,
  });

  if (!exists)
    await Like.create({
      post: postId,
      user: userId,
    });

  return {
    postId,
    userId,
    liked: true,
  };
};

const unlikePost = async (postId: string, userId: string) => {
  await Like.deleteOne({
    post: postId,
    user: userId,
  });

  return {
    postId,
    userId,
    liked: false,
  };
};

export { likePost, unlikePost };
