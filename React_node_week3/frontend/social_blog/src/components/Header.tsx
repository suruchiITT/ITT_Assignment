import { useNavigate, useLocation } from "react-router-dom";
import {
  HeaderContainer,
  TopRow,
  Logo,
  NavGroup,
  NavButton,
  RightGroup,
  ProfileButton,
  LogoutButton,
  WelcomeWrapper,
  WelcomeText,
  SubText,
  Word
} from "./styles/HeaderStyles";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/auth/authSlice";

export default function Header(){

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const welcome = "Welcome back to Social Blogging Platform 👋";
  const sub = "What would you like to share today?";

  const welcomeWords = welcome.split(" ");
  const subWords = sub.split(" ");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login",{replace:true});
  };

  return(

    <HeaderContainer>

      <TopRow>

        <Logo onClick={()=>navigate("/")}>
          Social Blogging
        </Logo>

        <NavGroup>

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

        </NavGroup>

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

      </TopRow>

      <WelcomeWrapper>

        <WelcomeText>
          {welcomeWords.map((w,i)=>(
            <Word key={i} delay={i*0.15}>{w}</Word>
          ))}
        </WelcomeText>

        <SubText>
          {subWords.map((w,i)=>(
            <Word key={i} delay={i*0.15}>{w}</Word>
          ))}
        </SubText>

      </WelcomeWrapper>

    </HeaderContainer>

  );

}
