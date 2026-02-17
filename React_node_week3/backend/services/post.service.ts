import Post from "../models/Post";
import User from "../models/User";
const createPost = async (
  userId: string,

  title: string,

  content: string,

  image?: string,
) => {
  const post = await Post.create({
    author: userId,

    title,

    content,

    image,
  });

  return await Post.findById(post._id)

    .populate(
      "author",

      "_id username email",
    );
};

const getFeed = async (
  userId: string,

  page: number = 1,

  limit: number = 10,
) => {
  const user = await User.findById(userId);

  const following = user?.following || [];

  const skip = (page - 1) * limit;

  const query = {
    author: {
      $in: [...following, userId],
    },
  };

  const posts = await Post.find(query)

    .populate(
      "author",

      "_id username email",
    )

    .sort({
      createdAt: -1,
    })

    .skip(skip)

    .limit(limit);

  const total = await Post.countDocuments(query);

  return {
    data: posts,

    page,

    limit,

    total,

    totalPages: Math.ceil(total / limit),
  };
};

const updatePost = async (
  postId: string,

  userId: string,

  title: string,

  content: string,
) => {
  const post = await Post.findById(postId);

  if (!post) throw new Error("Post not found");

  if (post.author.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  post.title = title;

  post.content = content;

  const updated = await post.save();

  return await Post.findById(updated._id)

    .populate(
      "author",

      "_id username email",
    );
};

const getFollowingPosts = async (
  userId: string,

  page: number = 1,

  limit: number = 10,
) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  const following = user.following;

  const skip = (page - 1) * limit;

  const posts = await Post.find({
    author: { $in: following },
  })

    .populate(
      "author",

      "_id username email profilePic",
    )

    .sort({
      createdAt: -1,
    })

    .skip(skip)

    .limit(limit);

  return posts;
};

const deletePost = async (
  postId: string,

  userId: string,
) => {
  console.log("this is post id in backend ", postId);

  const deletedPost = await Post.findOneAndDelete({
    _id: postId,
  });

  if (!postId) throw new Error("Post not found");
};

export { createPost, getFeed, updatePost, getFollowingPosts, deletePost };
