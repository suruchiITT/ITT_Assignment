import {
  useNavigate
} from "react-router-dom";

import {
  HeaderContainer,
  Title,
  ButtonGroup,
  HeaderButton,
  LogoutButton
} from "./styles/HeaderStyles";

import {
  useAppDispatch
} from "../app/hooks";

import {
  logout
} from "../features/auth/authSlice";

export default function Header(){

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleLogout = () => {

    dispatch(logout());

    navigate("/login");

  };

  return(

    <HeaderContainer>

      <Title
      onClick={() =>
      navigate("/")}>
        Social Notes
      </Title>

      <ButtonGroup>

        <HeaderButton
        onClick={() =>
        navigate("/user/:id")}>
          Profile
        </HeaderButton>

        <LogoutButton
        onClick={handleLogout}>
          Logout
        </LogoutButton>

      </ButtonGroup>

    </HeaderContainer>

  );

}
