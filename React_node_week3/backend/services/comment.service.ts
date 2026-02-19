import Comment from "../models/Comment";

const addComment = async (postId: string, userId: string, text: string) => {
  const comment = await Comment.create({
    post: postId,
    user: userId,
    text,
  });

  return await Comment.findById(comment._id).populate(
    "user",
    "_id username profilePic",
  );
};

const deleteComment = async (commentId: string) => {
  await Comment.findByIdAndDelete(commentId);

  return {
    commentId,
    deleted: true,
  };
};

const getComments = async (postId: string) => {
  return await Comment.find({
    post: postId,
  })
    .populate("user", "_id username profilePic")
    .sort({
      createdAt: -1,
    });
};

export { addComment, deleteComment, getComments };
