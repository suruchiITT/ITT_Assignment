import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useAppDispatch } from "../hooks/reduxHooks";
import { updateTask } from "../features/tasks/taskSlice";
import { fetchActivities } from "../features/activity/activitySlice";
import {
  TaskCardWrapper,
  TaskTitle,
  PriorityTag,
  CardFooter,
  StatusSelect,
  DueDateLabel,
  BadgeContainer,
  EditIcon,
  DragHandle,
  CardHeader,
  InlineDateInput,
} from "../styles/TaskCardStyles";

interface TaskCardProps {
  task: {
    _id: string;
    title: string;
    description: string;
    priority: "Low" | "Medium" | "High";
    status: string;
    dueDate?: string;
  };
  onDetailsClick: (task: any) => void;
  onEditClick: (task: any) => void;
  onStatusChange: (id: string, status: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDetailsClick,
  onEditClick,
  onStatusChange,
}) => {
  const dispatch = useAppDispatch();
  const [isEditingDate, setIsEditingDate] = useState(false);

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

  const handlePriorityToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const priorities: ("Low" | "Medium" | "High")[] = ["Low", "Medium", "High"];
    const currentIndex = priorities.indexOf(task.priority as any);
    const nextPriority = priorities[(currentIndex + 1) % priorities.length];

    // Only send fields that the backend expects to avoid validation errors
    const updatedData = {
      title: task.title,
      description: task.description,
      priority: nextPriority,
      status: task.status,
      dueDate: task.dueDate,
    };

    dispatch(
      updateTask({
        id: task._id,
        data: updatedData,
      })
    ).then(() => {
      dispatch(fetchActivities(1)); // Refresh logs after priority change
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    if (!newDate) {
      setIsEditingDate(false);
      return;
    }

    const updatedData = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: newDate,
    };

    dispatch(
      updateTask({
        id: task._id,
        data: updatedData,
      })
    ).then(() => {
      dispatch(fetchActivities(1)); // Refresh logs after date change
    });
    setIsEditingDate(false);
  };

  const today = new Date().toISOString().split("T")[0];

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditClick(task);
  };

  return (
    <TaskCardWrapper
      ref={setNodeRef}
      style={style}
      onClick={() => onDetailsClick(task)}
    >
      <CardHeader>
        <DragHandle {...attributes} {...listeners} onClick={(e) => e.stopPropagation()}>
          ⠿
        </DragHandle>
        <TaskTitle>{task.title}</TaskTitle>
        <EditIcon onClick={handleEdit} title="Edit Task">
          ✏️
        </EditIcon>
      </CardHeader>

      <BadgeContainer>
        <PriorityTag
          priority={task.priority}
          onClick={handlePriorityToggle}
          title="Click to change priority"
        >
          {task.priority}
        </PriorityTag>

        {isEditingDate ? (
          <InlineDateInput
            type="date"
            autoFocus
            min={today}
            defaultValue={task.dueDate ? task.dueDate.split("T")[0] : ""}
            onClick={(e) => e.stopPropagation()}
            onBlur={() => setIsEditingDate(false)}
            onChange={handleDateChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleDateChange(e as any);
              }
              if (e.key === "Escape") {
                setIsEditingDate(false);
              }
            }}
          />
        ) : (
          <DueDateLabel
            onClick={(e) => {
              e.stopPropagation();
              setIsEditingDate(true);
            }}
            title="Click to change date"
          >
            📅 {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Set date"}
          </DueDateLabel>
        )}
      </BadgeContainer>

      <CardFooter>
        <StatusSelect value={task.status} onChange={handleStatusChange} onClick={(e) => e.stopPropagation()}>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </StatusSelect>
      </CardFooter>
    </TaskCardWrapper>
  );
};

export default TaskCard;

