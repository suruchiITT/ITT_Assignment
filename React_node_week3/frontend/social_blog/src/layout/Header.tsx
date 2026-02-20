import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/auth/authSlice";
import {
  Container,
  Logo,
  Right,
  ProfileImage,
  LogoutButton
} from "../styles/layout/HeaderStyles";
import { BASE_URL } from "../utils/constants";

export default function Header() {

  const dispatch = useAppDispatch();

  const user = useAppSelector(
    state => state.auth.user
  );

  const image =
    user?.profilePic
      ? `${BASE_URL}/${user.profilePic}`
      : "/default-profile.png";

  return (
    <Container>

      <Logo>SocialApp</Logo>

      <Right>

        <ProfileImage src={image} />

        <LogoutButton
          onClick={() => dispatch(logout())}
        >
          Logout
        </LogoutButton>

      </Right>

    </Container>
  );

}
