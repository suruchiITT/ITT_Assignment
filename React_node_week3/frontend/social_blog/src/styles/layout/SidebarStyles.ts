import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  width:200px;
  border-right:1px solid #e2e8f0;
  padding:20px;
  display:flex;
  flex-direction:column;
  gap:10px;
`;

export const Item = styled(NavLink)`
  padding:10px;
  text-decoration:none;
  color:black;
  border-radius:6px;

  &.active {
    background:#2563eb;
    color:white;
  }
`;
