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
} from "../styles/TaskCardStyles";

interface ITask {
  _id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Todo" | "In Progress" | "Done";
  dueDate: string;
}

interface TaskCardProps {
  task: ITask;
  onClick: (task: ITask) => void;
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
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
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
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", alignItems: "center" }}>
        <PriorityTag priority={task.priority}>{task.priority}</PriorityTag>
        {task.dueDate && (
          <DueDateLabel>
            🕒 {formatDate(task.dueDate)}
          </DueDateLabel>
        )}
      </div>
      <CardFooter>
        <StatusSelect
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </StatusSelect>
      </CardFooter>
    </TaskCardWrapper>
  );
};

export default TaskCard;
