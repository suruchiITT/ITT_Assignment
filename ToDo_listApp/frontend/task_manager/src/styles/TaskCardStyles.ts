import styled from "styled-components";

export const TaskCardWrapper = styled.div`
  background: white;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 8px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  cursor: pointer;
  border: 1px solid #dfe1e6;
  position: relative;
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: #f4f5f7;
    box-shadow: 0 1px 2px rgba(9, 30, 66, 0.5);
    border-color: #ebecf0;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`;

export const DragHandle = styled.div`
  color: #6b778c;
  cursor: grab;
  padding: 2px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  &:hover {
    background: #ebecf0;
  }
`;

export const EditIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 3px;
  color: #5e6c84;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: opacity 0.2s, background 0.2s;
  &:hover {
    background: #ebecf0;
    opacity: 1;
    color: #172b4d;
  }
`;

export const TaskTitle = styled.div`
  font-size: 14px;
  color: #172b4d;
  margin-bottom: 8px;
  word-wrap: break-word;
  line-height: 1.4;
  flex: 1;
`;

export const PriorityTag = styled.span<{ priority: string }>`
  font-size: 11px;
  font-weight: 600;
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
  cursor: pointer;
`;

export const InlineSelect = styled.select`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 4px;
  border-radius: 2px;
  border: 1px solid #dfe1e6;
  background: white;
  cursor: pointer;
  &:focus {
    outline: 2px solid #0079bf;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

export const StatusSelect = styled.select`
  padding: 4px 6px;
  font-size: 11px;
  border-radius: 3px;
  border: 1px solid #dfe1e6;
  background: #ebecf0;
  color: #172b4d;
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
  padding: 2px 4px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background: #ebecf0;
  }
`;

export const InlineDateInput = styled.input`
  font-size: 11px;
  padding: 2px;
  border: 1px solid #dfe1e6;
  border-radius: 3px;
  color: #172b4d;
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;
