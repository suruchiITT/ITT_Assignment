import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  ColumnWrapper,
  ColumnHeader,
  ColumnTitle,
  TaskListArea,
  AddTaskButton,
  PlusIcon,
} from "../styles/TaskColumnStyles";

interface TaskColumnProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onAddCard: () => void;
  footer?: React.ReactNode;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  id,
  title,
  children,
  onAddCard,
  footer,
}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <ColumnWrapper ref={setNodeRef}>
      <ColumnHeader>
        <ColumnTitle>{title}</ColumnTitle>
      </ColumnHeader>
      <TaskListArea>{children}</TaskListArea>
      <AddTaskButton onClick={onAddCard}>
        <PlusIcon>+</PlusIcon> Add a card
      </AddTaskButton>
      {footer}
    </ColumnWrapper>
  );
};

export default TaskColumn;
