import { NavLink } from "react-router-dom";
import {
  Container,
  Item
} from "../styles/layout/SidebarStyles";

export default function Sidebar() {

  return (

    <Container>

      <Item to="/">Feed</Item>

      <Item to="/create">Create</Item>

      <Item to="/profile">Profile</Item>

    </Container>

  );

}
