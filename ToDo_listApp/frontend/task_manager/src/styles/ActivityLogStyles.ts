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
  
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const LogItem = styled.div`
  background: white;
  padding: 10px;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  font-size: 14px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const LogTaskTitle = styled.span`
  font-weight: 600;
  color: #172b4d;
  overflow-wrap: anywhere;
  word-break: break-all;
`;

export const UserName = styled.span`
  font-weight: 700;
  color: #0079bf;
  font-size: 14px;
`;

export const DotSeparator = styled.span`
  color: #6b778c;
`;

export const ColonSeparator = styled.span`
`;

export const MessageText = styled.span`
  color: #172b4d;
  overflow-wrap: anywhere;
  word-break: break-all;
`;

export const LogContent = styled.div`
  display: block;
  line-height: 1.5;
`;

export const Separator = styled.span`
  margin: 0 4px;
  color: #6b778c;
`;

export const Colon = styled.span`
  margin: 0 4px;
`;

export const Time = styled.div`
  font-size: 11px;
  color: #5e6c84;
`;

export const EmptyLog = styled.div`
  text-align: center;
  color: #5e6c84;
  font-size: 14px;
  margin-top: 20px;
`;
