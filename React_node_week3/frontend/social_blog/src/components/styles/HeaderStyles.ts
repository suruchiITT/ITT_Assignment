import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: fixed;

  top: 0;
  left: 0;
  right: 0;

  height: 74px;

  display: flex;
  align-items: center;

  padding: 0 24px;

  background: linear-gradient(
    135deg,
    #4b4376,
    #6c63ff
  );

  color: white;

  z-index: 1000;
`;

export const Logo = styled.div`
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
`;

export const CenterNav = styled.div`
  position: absolute;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

  display: flex;
  gap: 16px;
`;

export const NavButton = styled.button<{ $active?: boolean }>`
  padding: 8px 18px;

  border-radius: 8px;

  border: none;

  font-weight: 600;

  font-size: 14px;

  cursor: pointer;

  background: ${({ $active }) =>
    $active ? "white" : "rgba(255,255,255,0.15)"};

  color: ${({ $active }) =>
    $active ? "#4b4376" : "white"};

  transition: 0.25s;

  &:hover {
    background: white;
    color: #4b4376;
  }
`;

export const RightGroup = styled.div`
  margin-left: auto;

  display: flex;
  gap: 10px;
`;

export const ProfileButton = styled.button`
  padding: 8px 16px;

  border-radius: 8px;

  border: none;

  font-weight: 600;

  cursor: pointer;

  background: rgba(255,255,255,0.15);

  color: white;

  &:hover {
    background: white;
    color: #4b4376;
  }
`;

export const LogoutButton = styled.button`
  padding: 8px 16px;

  border-radius: 8px;

  border: none;

  font-weight: 600;

  cursor: pointer;

  background: #ff4d4f;

  color: white;

  &:hover {
    background: black;
  }
`;
