import User from "../models/User";

const getProfile = async (userId: string) => {

    return await User.findById(userId).select("-password");

};


const updateProfile = async (
    userId: string,
    username?: string,
    profilePic?: string
) => {

    return await User.findByIdAndUpdate(
        userId,
        { username, profilePic },
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
