import styled, { keyframes } from "styled-components";

const fadeWord = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 28px;
  background: linear-gradient(135deg,#4b4376,#6c63ff);
  color: white;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
`;

export const NavGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const NavButton = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: ${({ $active }) =>
    $active ? "white" : "rgba(255,255,255,0.15)"};
  color: ${({ $active }) =>
    $active ? "#4b4376" : "white"};
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s;

  &:hover{
    background: white;
    color: #4b4376;
  }
`;

export const RightGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const ProfileButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: rgba(255,255,255,0.15);
  color: white;
  cursor: pointer;
  font-weight: 600;

  &:hover{
    background: white;
    color: #4b4376;
  }
`;

export const LogoutButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: #ff4d4f;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover{
    background: black;
  }
`;

export const WelcomeWrapper = styled.div`
  margin-top: 10px;
`;

export const WelcomeText = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

export const SubText = styled.div`
  font-size: 14px;
  opacity: 0.9;
`;

export const Word = styled.span<{ delay:number }>`
  opacity: 0;
  display: inline-block;
  margin-right: 5px;
  animation: ${fadeWord} 0.5s ease forwards;
  animation-delay: ${({ delay }) => delay}s;
`;
