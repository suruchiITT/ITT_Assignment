import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  ColumnWrapper,
  ColumnHeader,
  ColumnTitle,
  TaskListArea,
  AddTaskButton,
} from "../styles/TaskColumnStyles";

interface TaskColumnProps {
  id: string;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onAddCard: () => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ id, title, children, footer, onAddCard }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <ColumnWrapper ref={setNodeRef}>
      <ColumnHeader>
        <ColumnTitle>{title}</ColumnTitle>
      </ColumnHeader>
      <TaskListArea>
        {children}
      </TaskListArea>
      {footer}
      <AddTaskButton onClick={onAddCard}>
        <span style={{ fontSize: "20px", fontWeight: "300" }}>+</span> Add a card
      </AddTaskButton>
    </ColumnWrapper>
  );
};

export default TaskColumn;
