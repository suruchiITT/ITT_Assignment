import { SidebarContainer, MenuItem } from "./styles/SidebarStyles";

import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <SidebarContainer>
      <MenuItem
        $active={location.pathname === "/"}
        onClick={() => navigate("/")}
      >
        Feed
      </MenuItem>

      <MenuItem
        $active={location.pathname === "/users"}
        onClick={() => navigate("/users")}
      >
        Users
      </MenuItem>

      <MenuItem
        $active={location.pathname === "/create-post"}
        onClick={() => navigate("/create-post")}
      >
        Create Post
      </MenuItem>
    </SidebarContainer>
  );
}
