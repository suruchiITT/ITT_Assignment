import {
  Container,
  Username
} from "../../styles/user/UserCardStyles";

import FollowButton
from "./FollowButton";

export default function UserCard({ user }: any) {

  return (

    <Container>

      <Username>
        {user.username}
      </Username>

      <FollowButton userId={user._id} />

    </Container>

  );

}
