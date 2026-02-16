import User from "../models/User";

const getProfile = async (userId: string) => {

    return await User.findById(userId).select("-password");

};

const updateProfile = async (
    userId: string,
    username?: string,
    profilePic?: string
) => {

    const update: any = {};

    if (username !== undefined) {
        update.username = username;
    }

    if (profilePic !== undefined) {
        update.profilePic = profilePic;
    }

    return await User.findByIdAndUpdate(
        userId,
        update,
        { new: true }
    );

};

const getAllUsers = async () => {

    return await User.find().select("-password");

};

const followUser = async (currentUserId: string, targetUserId: string) => {

    await User.findByIdAndUpdate(currentUserId, {
        $addToSet: { following: targetUserId }
    });

    await User.findByIdAndUpdate(targetUserId, {
        $addToSet: { followers: currentUserId }
    });

};

 export const getFollowing = async (userId: string) => {

    const user =
    await User.findById(userId)
    .populate(
        "following",
        "_id username email profilePic"
    );

    if (!user)
        throw new Error("User not found");

    return user.following;

};



  export const getFollowers = async (userId: string) => {

    const user =
    await User.findById(userId)
    .populate(
        "followers",
        "_id username email profilePic"
    );

    if (!user)
        throw new Error("User not found");

    return user.followers;

};

const unfollowUser = async (currentUserId: string, targetUserId: string) => {

    await User.findByIdAndUpdate(currentUserId, {
        $pull: { following: targetUserId }
    });

    await User.findByIdAndUpdate(targetUserId, {
        $pull: { followers: currentUserId }
    });

};

export {
    getProfile,
    updateProfile,
    getAllUsers,
    followUser,
    unfollowUser
};
