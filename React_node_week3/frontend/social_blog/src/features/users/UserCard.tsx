import {
  useAppDispatch,
  useAppSelector
} from "../../app/hooks";

import {
  followUser,
  unfollowUser
} from "./userSlice";

import {
  Card,
  Avatar,
  Name,
  Button
} from "./styles/UserCardStyles";

export default function UserCard({ user }: any){

  const dispatch = useAppDispatch();

  const profile =
    useAppSelector(state => state.users.profile);

  const isFollowing =
    profile?.following?.includes(user._id);

  const handleToggle = () => {

    if(isFollowing){

      dispatch(unfollowUser(user._id));

    }else{

      dispatch(followUser(user._id));

    }

  };

  return(

    <Card>

      <Avatar
        src={
          user.profilePic ||
          "https://ui-avatars.com/api/?name=" +
          user.username
        }
      />

      <Name>
        {user.username}
      </Name>

      <Button
        $following={isFollowing}
        onClick={handleToggle}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>

    </Card>

  );

}
