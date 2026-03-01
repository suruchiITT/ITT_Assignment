import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  TaskCardWrapper,
  TaskTitle,
  PriorityTag,
  CardFooter,
  StatusSelect,
  DueDateLabel,
  BadgeContainer,
} from "../styles/TaskCardStyles";

interface TaskCardProps {
  task: {
    _id: string;
    title: string;
    priority: "Low" | "Medium" | "High";
    status: string;
    dueDate?: string;
  };
  onClick: (task: any) => void;
  onStatusChange: (id: string, status: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, onStatusChange }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    onStatusChange(task._id, e.target.value);
  };

  return (
    <TaskCardWrapper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(task)}
    >
      <TaskTitle>{task.title}</TaskTitle>

      <BadgeContainer>
        <PriorityTag priority={task.priority}>{task.priority}</PriorityTag>
        {task.dueDate && (
          <DueDateLabel>
            📅 {new Date(task.dueDate).toLocaleDateString()}
          </DueDateLabel>
        )}
      </BadgeContainer>

      <CardFooter>
        <StatusSelect value={task.status} onChange={handleStatusChange}>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </StatusSelect>
      </CardFooter>
    </TaskCardWrapper>
  );
};

export default TaskCard;
