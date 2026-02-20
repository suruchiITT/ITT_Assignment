import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  followUser,
  unfollowUser
} from "../../redux/users/userSlice";
import { Button } from "../../styles/user/UserCardStyles";

export default function FollowButton({ userId }: any) {

  const dispatch = useAppDispatch();

  const profile =
    useAppSelector(
      state => state.users.profile
    );

  const following =
    profile?.following.includes(userId);

  const click = () => {

    if (following)
      dispatch(unfollowUser(userId));

    else
      dispatch(followUser(userId));

  };

  return (
    <Button onClick={click}>
      {following ? "Unfollow" : "Follow"}
    </Button>
  );

}
