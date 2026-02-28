import styled from "styled-components";

export const ActivityContainer = styled.div`
  min-height: 100vh;
  background-color: #0079bf;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
`;

export const ActivityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  color: white;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
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

export const ActivityLogWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  height: calc(100vh - 120px);
  width: 100%;
  display: flex;
  flex-direction: column;
`;
