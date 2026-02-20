import { useEffect }
from "react";

import {
  useAppDispatch,
  useAppSelector
} from "../../redux/hooks";

import {
  fetchProfile
} from "../../redux/users/userSlice";

import {
  Container,
  Username,
  Stats
} from "../../styles/user/ProfileStyles";

export default function ProfilePage() {

  const dispatch =
    useAppDispatch();

  const profile =
    useAppSelector(
      state => state.users.profile
    );

  useEffect(()=>{

    dispatch(fetchProfile());

  },[]);

  if(!profile) return null;

  return (

    <Container>

      <Username>
        {profile.username}
      </Username>

      <Stats>
        Followers:
        {profile.followers.length}
      </Stats>

      <Stats>
        Following:
        {profile.following.length}
      </Stats>

    </Container>

  );

}
