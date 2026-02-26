import styled from "styled-components";

export const ActivityContainer = styled.div`
  min-height: 100vh;
  background-color: #0079bf;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

export const ActivityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  color: white;
`;

export const ActivityTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

export const BackButton = styled.button`
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const LogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 800px;
  margin: 0 auto;
`;

export const LogCard = styled.div`
  background: #f4f5f7;
  padding: 16px;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LogMessage = styled.p`
  font-size: 14px;
  color: #172b4d;
  margin: 0;
`;

export const LogTaskTitle = styled.span`
  font-weight: 600;
  color: #0079bf;
`;

export const LogTime = styled.span`
  font-size: 12px;
  color: #5e6c84;
`;

export const LoadingText = styled.p`
  color: white;
  text-align: center;
  font-size: 16px;
`;
