import styled from "styled-components";

export const ColumnWrapper = styled.div`
  background: #ebecf0;
  width: 272px;
  max-height: calc(100vh - 120px);
  border-radius: 3px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
`;

export const ColumnHeader = styled.div`
  padding: 6px 8px 10px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ColumnTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #172b4d;
  margin: 0;
`;

export const TaskListArea = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 10px;
  padding-right: 2px;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
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
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: rgba(9, 30, 66, 0.08);
    color: #172b4d;
  }
`;
