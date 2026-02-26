import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  fetchTasks,
  changeStatus,
  createTask,
  updateTask,
  deleteTask,
} from "../features/tasks/taskSlice";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  DndContext,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  useDroppable,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DashboardContainer,
  Header,
  Title,
  LogoutButton,
  Board,
  Column,
  ColumnTitle,
  TaskCard,
  PriorityTag,
  StatusSelect,
  AddTaskButton,
  ModalOverlay,
  Modal,
  Input,
  Select,
  ModalButton,
  FilterBar,
  FilterSelect,
  FilterInput,
} from "../styles/DashboardStyles";

// Define an interface for the task to provide better type safety
interface ITask {
  _id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Todo" | "In Progress" | "Done";
  dueDate: string;
}

// Custom Draggable Task Card Component
function DraggableTaskCard({ task, onClick, onStatusChange }: { task: ITask; onClick: (task: ITask) => void; onStatusChange: (id: string, status: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TaskCard
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(task)}
    >
      <strong>{task.title}</strong>
      <p>{task.description}</p>
      <PriorityTag priority={task.priority}>{task.priority}</PriorityTag>
      <StatusSelect
        value={task.status}
        onChange={(e) => onStatusChange(task._id, e.target.value)}
        onClick={(e) => e.stopPropagation()} // Prevent card click when changing status
      >
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </StatusSelect>
    </TaskCard>
  );
}

// Custom Droppable Column Component
function DroppableColumn({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <Column ref={setNodeRef}>
      <ColumnTitle>{title}</ColumnTitle>
      {children}
    </Column>
  );
}


export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tasks } = useAppSelector((state) => state.tasks);

  const [filters, setFilters] = useState({
    priority: "",
    status: "",
    dueDate: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // New state for edit modal
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null); // New state for selected task

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  useEffect(() => {
    applyFilters();
  }, []);

  const applyFilters = () => {
    let query = "?";

    if (filters.priority) query += `priority=${filters.priority}&`;
    if (filters.status) query += `status=${filters.status}&`;
    if (filters.dueDate) query += `dueDate=${filters.dueDate}&`;

    dispatch(fetchTasks(query));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleStatusChange = (id: string, status: string) => {
    dispatch(changeStatus({ id, status }));
  };

  const handleCreateTask = async () => {
    if (!newTask.title.trim()) {
      alert("Task title cannot be empty.");
      return;
    }
    await dispatch(createTask(newTask));
    setShowModal(false);
    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
    });
  };

  // New functions for editing and deleting tasks
  const handleCardClick = (task: ITask) => {
    setSelectedTask({ ...task, dueDate: task.dueDate.split('T')[0] }); // Format date for input type="date"
    setShowEditModal(true);
  };

  const handleUpdateTask = async () => {
    if (!selectedTask?.title?.trim()) {
      alert("Task title cannot be empty.");
      return;
    }
    await dispatch(updateTask({ id: selectedTask._id, data: selectedTask }));
    setShowEditModal(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = async () => {
    if (selectedTask && window.confirm("Are you sure you want to delete this task?")) {
      await dispatch(deleteTask(selectedTask._id));
      setShowEditModal(false);
      setSelectedTask(null);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeTask = tasks.find(task => task._id === active.id);
    const newStatus = over.id as ITask['status']; // The droppable ID is the status

    if (activeTask && activeTask.status !== newStatus) {
      dispatch(changeStatus({ id: activeTask._id, status: newStatus }));
    }
  };

  const todo = tasks.filter((t) => t.status === "Todo");
  const progress = tasks.filter((t) => t.status === "In Progress");
  const done = tasks.filter((t) => t.status === "Done");

  const renderColumn = (title: string, data: ITask[], statusId: string) => (
    <DroppableColumn id={statusId} title={title}>
      {data.map((task: ITask) => (
        <DraggableTaskCard
          key={task._id}
          task={task}
          onClick={handleCardClick}
          onStatusChange={handleStatusChange}
        />
      ))}
    </DroppableColumn>
  );

  return (
    <DashboardContainer>
      <Header>
        <Title>Smart Task Manager</Title>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>

      <FilterBar>
        <FilterSelect
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        >
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </FilterSelect>

        <FilterSelect
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </FilterSelect>

        <FilterInput
          type="date"
          onChange={(e) => setFilters({ ...filters, dueDate: e.target.value })}
        />

        <ModalButton onClick={applyFilters}>Apply Filters</ModalButton>
        <AddTaskButton onClick={() => setShowModal(true)}>Add New Task</AddTaskButton>
      </FilterBar>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={onDragEnd}
      >
        <Board>
          {renderColumn("Todo", todo, "Todo")}
          {renderColumn("In Progress", progress, "In Progress")}
          {renderColumn("Done", done, "Done")}
        </Board>
      </DndContext>

      {showModal && (
        <ModalOverlay>
          <Modal>
            <h2>Create New Task</h2>
            <Input
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <Input
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <Select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Select>
            <Input
              type="date"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
            />
            <ModalButton onClick={handleCreateTask}>Create Task</ModalButton>
            <ModalButton onClick={() => setShowModal(false)}>Cancel</ModalButton>
          </Modal>
        </ModalOverlay>
      )}

      {/* Edit Task Modal */}
      {showEditModal && selectedTask && (
        <ModalOverlay>
          <Modal>
            <h2>Edit Task</h2>
            <Input
              placeholder="Title"
              value={selectedTask.title}
              onChange={(e) =>
                setSelectedTask({ ...selectedTask, title: e.target.value })
              }
            />
            <Input
              placeholder="Description"
              value={selectedTask.description}
              onChange={(e) =>
                setSelectedTask({ ...selectedTask, description: e.target.value })
              }
            />
            <Select
              value={selectedTask.priority}
              onChange={(e) =>
                setSelectedTask({ ...selectedTask, priority: e.target.value as ITask['priority'] })
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Select>
            <Input
              type="date"
              value={selectedTask.dueDate}
              onChange={(e) =>
                setSelectedTask({ ...selectedTask, dueDate: e.target.value })
              }
            />
            <ModalButton onClick={handleUpdateTask}>Save Changes</ModalButton>
            <ModalButton onClick={handleDeleteTask} style={{ background: "#ef4444" }}>Delete Task</ModalButton>
            <ModalButton onClick={() => setShowEditModal(false)}>Cancel</ModalButton>
          </Modal>
        </ModalOverlay>
      )}
    </DashboardContainer>
  );
}
