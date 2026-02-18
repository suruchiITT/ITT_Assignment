import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 240px;
  padding: 20px;
  background: white;
  border-right: 1px solid #eee;
`;

export const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
  object-fit: cover;
`;

export const Username = styled.div`
  font-weight: 600;
  color: #4b4376;
`;
