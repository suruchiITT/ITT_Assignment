import {
  SidebarContainer,
  ProfileCard,
  Avatar,
  Username
} from "./styles/SidebarStyles";
import { useAppSelector } from "../app/hooks";

export default function Sidebar(){

  const user = useAppSelector(state=>state.users.profile);

  return(

    <SidebarContainer>

      <ProfileCard>

        <Avatar
          src={
            user?.profilePic
            ? user.profilePic
            : "https://i.pravatar.cc/150"
          }
        />

        <Username>
          {user?.username}
        </Username>

      </ProfileCard>

    </SidebarContainer>

  );

}
