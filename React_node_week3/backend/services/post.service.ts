import Post from "../models/Post";
import User from "../models/User";

const createPost = async (
    userId: string,
    title: string,
    content: string,
    image?: string
) => {

    return await Post.create({
        author: userId,
        title,
        content,
        image
    });

};


const getFeed = async (userId: string) => {

    const user = await User.findById(userId);

    const following = user?.following || [];

    return await Post.find({
        author: { $in: [...following, userId] }
    }).sort({ createdAt: -1 });

};


const updatePost = async (
    postId: string,
    userId: string,
    title: string,
    content: string
) => {

    const post = await Post.findById(postId);

    if (!post) throw new Error("Post not found");

    if (post.author.toString() !== userId) {
        throw new Error("Unauthorized");
    }

    post.title = title;
    post.content = content;

    return await post.save();

};


const deletePost = async (postId: string, userId: string) => {

    const post = await Post.findById(postId);

    if (!post) throw new Error("Post not found");

    if (post.author.toString() !== userId) {
        throw new Error("Unauthorized");
    }

    await post.deleteOne();

};


export {
    createPost,
    getFeed,
    updatePost,
    deletePost
};
