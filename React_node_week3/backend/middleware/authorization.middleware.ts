import Post from "../models/Post";

export const authorizePostOwner = async (req: any, res: any, next: any) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: "Post not found" });

  if (post.author.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Forbidden" });

  next();
};
