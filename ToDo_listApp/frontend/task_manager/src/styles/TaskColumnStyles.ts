import styled from "styled-components";

export const ColumnWrapper = styled.div`
  background: #ebecf0;
  flex: 1;
  height: 100%;
  border-radius: 3px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  min-width: 0;
  overflow: hidden;
`;

export const ColumnHeader = styled.div`
  padding: 6px 8px 10px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

export const ColumnTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #172b4d;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const TaskListArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2px 4px;
  
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const AddTaskButton = styled.button`
  width: 100%;
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: 3px;
  color: #5e6c84;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  flex-shrink: 0;
  &:hover {
    background: rgba(9, 30, 66, 0.08);
    color: #172b4d;
  }
`;

export const PlusIcon = styled.span`
  font-size: 20px;
  font-weight: 300;
`;
