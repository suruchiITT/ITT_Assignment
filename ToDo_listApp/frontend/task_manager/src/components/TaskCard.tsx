import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useAppDispatch } from "../hooks/reduxHooks";
import { updateTask } from "../features/tasks/taskSlice";
import { fetchActivities } from "../features/activity/activitySlice";
import {
  TaskCardWrapper,
  TaskTitle,
  ShowMoreButton,
  PrioritySelect,
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
  isOverlay?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDetailsClick,
  onEditClick,
  onStatusChange,
  isOverlay,
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
  } = useSortable({ id: task._id, disabled: isOverlay });

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    onStatusChange(task._id, e.target.value);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    const nextPriority = e.target.value as "Low" | "Medium" | "High";

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
      dispatch(fetchActivities(1));
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
      dispatch(fetchActivities(1));
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
      transform={CSS.Translate.toString(transform)}
      transition={transition}
      opacity={isDragging ? 0.5 : 1}
      zIndex={isDragging ? 1000 : 1}
      cursor={isOverlay ? "grabbing" : "pointer"}
      {...attributes}
      {...listeners}
      onClick={() => onDetailsClick(task)}
    >
      <CardHeader>
        <DragHandle onClick={(e) => e.stopPropagation()}>
          ⠿
        </DragHandle>
        <TaskTitle>{task.title}</TaskTitle>
        <EditIcon onClick={handleEdit} title="Edit Task">
          ✏️
        </EditIcon>
      </CardHeader>

      <BadgeContainer>
        <PrioritySelect
          priority={task.priority}
          value={task.priority}
          onChange={handlePriorityChange}
          onClick={(e) => e.stopPropagation()}
          title="Change priority"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </PrioritySelect>

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
