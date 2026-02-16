import styled from "styled-components";

interface MenuItemProps {

  $active?: boolean;

}

export const SidebarContainer =
styled.div`

  width: 220px;

  height: calc(100vh - 60px);

  background: white;

  border-right: 1px solid #ddd;

  padding-top: 20px;

`;

export const MenuItem =
styled.div<MenuItemProps>`

  padding: 15px 20px;

  cursor: pointer;

  font-weight: 500;

  background: ${({ $active }) =>
    $active ? "#e7f3ff" : "white"};

  color: ${({ $active }) =>
    $active ? "#1877f2" : "black"};

  &:hover {

    background: #f0f2f5;

  }

`;
