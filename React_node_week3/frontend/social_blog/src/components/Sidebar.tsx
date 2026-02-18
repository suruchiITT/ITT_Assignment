import {
  SidebarContainer,
  ProfileButton
} from "./styles/SidebarStyles";

import { useNavigate } from "react-router-dom";

export default function Sidebar(){

  const navigate = useNavigate();

  return(

    <SidebarContainer>

      <ProfileButton
        onClick={()=>navigate("/user/me")}
      >
        Profile
      </ProfileButton>

    </SidebarContainer>

  );

}
