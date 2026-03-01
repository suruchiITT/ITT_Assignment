import styled from "styled-components";

export const TaskCardWrapper = styled.div`
  background: white;
  padding: 8px 10px 10px;
  border-radius: 3px;
  margin-bottom: 8px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: #f4f5f7;
    box-shadow: 0 1px 2px rgba(9, 30, 66, 0.5);
  }
`;

export const TaskTitle = styled.div`
  font-size: 14px;
  color: #172b4d;
  margin-bottom: 8px;
  word-wrap: break-word;
  line-height: 1.4;
`;

export const PriorityTag = styled.span<{ priority: string }>`
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 2px;
  color: white;
  background: ${(props) =>
    props.priority === "High"
      ? "#eb5a46"
      : props.priority === "Medium"
      ? "#f2d600"
      : "#61bd4f"};
  display: inline-block;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const StatusSelect = styled.select`
  padding: 2px 4px;
  font-size: 11px;
  border-radius: 3px;
  border: none;
  background: #ebecf0;
  color: #5e6c84;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background: #dfe1e6;
  }
`;

export const DueDateLabel = styled.div`
  font-size: 11px;
  color: #5e6c84;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
`;
