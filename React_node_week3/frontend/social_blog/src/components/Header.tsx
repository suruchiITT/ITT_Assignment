import { useNavigate, useLocation } from "react-router-dom";

import {
  HeaderContainer,
  Logo,
  CenterNav,
  NavButton,
  RightGroup,
  ProfileButton,
  LogoutButton
} from "./styles/HeaderStyles";

import { useAppDispatch } from "../app/hooks";

import { logout } from "../features/auth/authSlice";

export default function Header(){

  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useAppDispatch();

  const handleLogout = ()=>{
    dispatch(logout());
    navigate("/login",{replace:true});
  };

  return(

    <HeaderContainer>

      <Logo onClick={()=>navigate("/")}>
        Social Blogging
      </Logo>

      <CenterNav>

        <NavButton
          $active={location.pathname === "/"}
          onClick={()=>navigate("/")}>
          Feed
        </NavButton>

        <NavButton
          $active={location.pathname === "/users"}
          onClick={()=>navigate("/users")}>
          Users
        </NavButton>

        <NavButton
          $active={location.pathname === "/create-post"}
          onClick={()=>navigate("/create-post")}>
          Create Post
        </NavButton>

      </CenterNav>

      <RightGroup>

        <ProfileButton
          onClick={()=>navigate("/user/me")}>
          Profile
        </ProfileButton>

        <LogoutButton
          onClick={handleLogout}>
          Logout
        </LogoutButton>

      </RightGroup>

    </HeaderContainer>

  );

}
