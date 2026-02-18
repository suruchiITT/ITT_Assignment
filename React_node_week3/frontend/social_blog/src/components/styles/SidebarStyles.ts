import styled from "styled-components";

export const SidebarContainer = styled.div`
  position: fixed;

  top: 74px;

  left: 0;

  width: 230px;

  height: calc(100vh - 74px);

  background: white;

  border-right: 1px solid #eee;

  padding: 20px;

  z-index: 900;
`;

export const ProfileButton = styled.button`
  width: 100%;

  padding: 12px;

  border: none;

  border-radius: 10px;

  font-weight: 600;

  cursor: pointer;

  background: linear-gradient(
    135deg,
    #4b4376,
    #6c63ff
  );

  color: white;

  &:hover{
    background: black;
  }
`;
