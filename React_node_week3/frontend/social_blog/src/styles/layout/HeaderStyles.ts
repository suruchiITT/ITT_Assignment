import styled from "styled-components";

export const Container = styled.div`
  height:60px;
  background:white;
  border-bottom:1px solid #e2e8f0;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:0 20px;
`;

export const Logo = styled.div`
  font-weight:bold;
  font-size:18px;
`;

export const Right = styled.div`
  display:flex;
  align-items:center;
  gap:10px;
`;

export const ProfileImage = styled.img`
  width:35px;
  height:35px;
  border-radius:50%;
`;

export const LogoutButton = styled.button`
  background:#2563eb;
  color:white;
  border:none;
  padding:6px 12px;
  border-radius:6px;
  cursor:pointer;
`;
