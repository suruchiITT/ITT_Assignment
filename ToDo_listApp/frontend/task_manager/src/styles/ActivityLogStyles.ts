import styled from "styled-components";

export const LogContainer = styled.div`
  background: #f4f5f7;
  padding: 16px;
  border-radius: 3px;
  flex: 1;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LogListArea = styled.div`
  flex: 1;
  overflow-y: auto;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const LogItem = styled.div`
  background: white;
  padding: 8px;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  font-size: 14px;
  margin-bottom: 8px;
`;

export const LogTaskTitle = styled.span`
  font-weight: 600;
  color: #0079bf;
`;

export const Time = styled.div`
  font-size: 12px;
  color: #5e6c84;
  margin-top: 4px;
`;

export const EmptyLog = styled.div`
  text-align: center;
  color: #5e6c84;
  font-size: 14px;
  margin-top: 20px;
`;
