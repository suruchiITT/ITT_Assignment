import {
  useAppDispatch,
  useAppSelector
} from "../../app/hooks";

import userSlice, {
  followUser,
  unfollowUser
} from "./userSlice";

import {
  Card,
  Name,
  Button
} from "./styles/UserCardStyles";

export default function UserCard({
  user
}: any){

  const dispatch = useAppDispatch();

  const profile =
  useAppSelector(
    state=>state.users.profile
  );

  const isFollowing =
  profile?.following.includes(user._id);

  return(

    <Card>

      <Name>
        {user.username}
      </Name>

      {

        isFollowing ?

        <Button
        onClick={()=>
          dispatch(unfollowUser(user._id))
        }>
          Unfollow
        </Button>

        :

        <Button
        onClick={()=>
          dispatch(followUser(user._id))
        }>
          Follow
        </Button>

      }

    </Card>

  );

}