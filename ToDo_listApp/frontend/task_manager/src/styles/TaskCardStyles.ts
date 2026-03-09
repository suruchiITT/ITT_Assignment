import styled from "styled-components";

export const TaskCardWrapper = styled.div<{ 
  transform?: string; 
  transition?: string; 
  opacity?: number; 
  zIndex?: number;
  cursor?: string;
}>`
  background: white;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  cursor: ${(props) => props.cursor || "pointer"};
  border: 1px solid #dfe1e6;
  position: relative;
  transition: ${(props) => props.transition || "background 0.2s, box-shadow 0.2s, border-color 0.2s"};
  transform: ${(props) => props.transform};
  opacity: ${(props) => props.opacity ?? 1};
  z-index: ${(props) => props.zIndex ?? 1};
  touch-action: none;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 100px;
  
  &:hover {
    background: #f8f9fa;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    border-color: #c1c7d0;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
`;

export const DragHandle = styled.div`
  color: #6b778c;
  cursor: grab;
  padding: 2px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  touch-action: none;
  font-size: 16px;
  opacity: 0.5;
  
  &:hover {
    background: #ebecf0;
    opacity: 1;
  }
`;

export const EditIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
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
  font-weight: 500;
  line-height: 1.5;
  flex: 1;
  word-break: break-word;
  white-space: pre-wrap;
  margin-bottom: 8px;
`;

export const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: #0079bf;
  font-size: 12px;
  padding: 0;
  cursor: pointer;
  margin-left: 4px;
  &:hover {
    text-decoration: underline;
  }
`;

export const PrioritySelect = styled.select<{ priority: string }>`
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 3px;
  color: white;
  border: none;
  text-transform: uppercase;
  background: ${(props) =>
    props.priority === "High"
      ? "#eb5a46"
      : props.priority === "Medium"
      ? "#f2d600"
      : "#61bd4f"};
  cursor: pointer;
  height: 20px;
  outline: none;
  
  option {
    background: white;
    color: #172b4d;
    text-transform: none;
  }
`;

export const PriorityTag = styled.span<{ priority: string }>`
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 3px;
  color: white;
  text-transform: uppercase;
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
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px solid #f4f5f7;
`;

export const StatusSelect = styled.select`
  padding: 2px 4px;
  font-size: 10px;
  border-radius: 3px;
  border: 1px solid #dfe1e6;
  background: #ebecf0;
  color: #172b4d;
  cursor: pointer;
  font-weight: 600;
  height: 24px;
  
  &:hover {
    background: #dfe1e6;
  }
`;

export const DueDateLabel = styled.div`
  font-size: 10px;
  color: #5e6c84;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 4px;
  border-radius: 3px;
  cursor: pointer;
  background: #f4f5f7;
  
  &:hover {
    background: #ebecf0;
    color: #172b4d;
  }
`;

export const InlineDateInput = styled.input`
  font-size: 10px;
  padding: 1px 2px;
  border: 1px solid #0079bf;
  border-radius: 3px;
  color: #172b4d;
  height: 20px;
  outline: none;
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;
