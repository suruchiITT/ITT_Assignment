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
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ActivityLog from "../components/ActivityLog";
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
  FilterBar,
  TaskTitle,
  ColumnHeader,
  ModalTitle,
  InputGroup,
  Label,
  TextArea,
  ButtonRow,
  PrimaryButton,
  DangerButton,
  GhostButton,
  FilterItem,
  MainLayout,
  ContentArea,
  ActivitySidebar,
  SidebarHeader,
  SidebarTitle,
} from "../styles/DashboardStyles";

interface ITask {
  _id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Todo" | "In Progress" | "Done";
  dueDate: string;
}

function DraggableTaskCard({
  task,
  onClick,
  onStatusChange,
}: {
  task: ITask;
  onClick: (task: ITask) => void;
  onStatusChange: (id: string, status: string) => void;
}) {
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

  return (
    <TaskCard
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(task)}
    >
      <TaskTitle>{task.title}</TaskTitle>
      <PriorityTag priority={task.priority}>{task.priority}</PriorityTag>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <StatusSelect
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </StatusSelect>
      </div>
    </TaskCard>
  );
}

function DroppableColumn({
  id,
  title,
  children,
  onAddCard,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  onAddCard: () => void;
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <Column ref={setNodeRef}>
      <ColumnHeader>
        <ColumnTitle>{title}</ColumnTitle>
      </ColumnHeader>
      <div style={{ flex: 1, overflowY: "auto", minHeight: "10px" }}>
        {children}
      </div>
      <AddTaskButton onClick={onAddCard}>
        <span>+</span> Add a card
      </AddTaskButton>
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium" as "Low" | "Medium" | "High",
    dueDate: "",
  });

  useEffect(() => {
    applyFilters();
  }, [filters]);

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
    if (!newTask.title.trim()) return;
    await dispatch(createTask(newTask));
    setShowModal(false);
    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
    });
  };

  const handleCardClick = (task: ITask) => {
    setSelectedTask({ ...task, dueDate: task.dueDate.split("T")[0] });
    setShowEditModal(true);
  };

  const handleUpdateTask = async () => {
    if (!selectedTask?.title?.trim()) return;
    const { _id, user, createdAt, updatedAt, __v, id, ...updateData } = selectedTask as any;
    await dispatch(updateTask({ id: _id, data: updateData }));
    setShowEditModal(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = async () => {
    if (selectedTask && window.confirm("Delete this task?")) {
      await dispatch(deleteTask(selectedTask._id));
      setShowEditModal(false);
      setSelectedTask(null);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((t) => t._id === activeId);
    if (!activeTask) return;

    let newStatus: string | null = null;

    if (["Todo", "In Progress", "Done"].includes(overId)) {
      newStatus = overId;
    } else {
      const overTask = tasks.find((t) => t._id === overId);
      if (overTask && overTask.status !== activeTask.status) {
        newStatus = overTask.status;
      }
    }

    if (newStatus && newStatus !== activeTask.status) {
      dispatch(changeStatus({ id: activeId, status: newStatus }));
    }
  };

  const todo = tasks.filter((t) => t.status === "Todo");
  const progress = tasks.filter((t) => t.status === "In Progress");
  const done = tasks.filter((t) => t.status === "Done");

  return (
    <DashboardContainer>
      <Header>
        <Title>Tasks Board</Title>
        <div style={{ display: "flex", gap: "8px" }}>
          <LogoutButton onClick={() => setShowActivity(!showActivity)}>
            {showActivity ? "Hide Activity" : "Show Activity"}
          </LogoutButton>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </div>
      </Header>

      <MainLayout>
        <ContentArea>
          <FilterBar>
            <FilterItem>
              <Label style={{ color: "white" }}>Priority:</Label>
              <Select
                style={{ padding: "2px", fontSize: "12px" }}
                onChange={(e) =>
                  setFilters({ ...filters, priority: e.target.value })
                }
              >
                <option value="">All</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
            </FilterItem>

            <FilterItem>
              <Label style={{ color: "white" }}>Date:</Label>
              <Input
                type="date"
                style={{ padding: "2px", fontSize: "12px" }}
                onChange={(e) =>
                  setFilters({ ...filters, dueDate: e.target.value })
                }
              />
            </FilterItem>
          </FilterBar>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={onDragEnd}
          >
            <Board>
              <SortableContext
                items={todo.map((t) => t._id)}
                strategy={verticalListSortingStrategy}
              >
                <DroppableColumn
                  id="Todo"
                  title="To Do"
                  onAddCard={() => setShowModal(true)}
                >
                  {todo.map((task: ITask) => (
                    <DraggableTaskCard
                      key={task._id}
                      task={task}
                      onClick={handleCardClick}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </DroppableColumn>
              </SortableContext>

              <SortableContext
                items={progress.map((t) => t._id)}
                strategy={verticalListSortingStrategy}
              >
                <DroppableColumn
                  id="In Progress"
                  title="In Progress"
                  onAddCard={() => setShowModal(true)}
                >
                  {progress.map((task: ITask) => (
                    <DraggableTaskCard
                      key={task._id}
                      task={task}
                      onClick={handleCardClick}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </DroppableColumn>
              </SortableContext>

              <SortableContext
                items={done.map((t) => t._id)}
                strategy={verticalListSortingStrategy}
              >
                <DroppableColumn
                  id="Done"
                  title="Done"
                  onAddCard={() => setShowModal(true)}
                >
                  {done.map((task: ITask) => (
                    <DraggableTaskCard
                      key={task._id}
                      task={task}
                      onClick={handleCardClick}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </DroppableColumn>
              </SortableContext>
            </Board>
          </DndContext>
        </ContentArea>

        <ActivitySidebar show={showActivity}>
          <SidebarHeader>
            <SidebarTitle>Activity Log</SidebarTitle>
            <GhostButton
              onClick={() => setShowActivity(false)}
              style={{ padding: "4px" }}
            >
              ✕
            </GhostButton>
          </SidebarHeader>
          <div style={{ flex: 1, overflowY: "auto" }}>
            <ActivityLog />
          </div>
        </ActivitySidebar>
      </MainLayout>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Create Card</ModalTitle>
            <InputGroup>
              <Label>Title</Label>
              <Input
                autoFocus
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
            </InputGroup>
            <InputGroup>
              <Label>Description</Label>
              <TextArea
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
            </InputGroup>
            <InputGroup>
              <Label>Priority</Label>
              <Select
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: e.target.value as any })
                }
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
            </InputGroup>
            <InputGroup>
              <Label>Due Date</Label>
              <Input
                type="date"
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask({ ...newTask, dueDate: e.target.value })
                }
              />
            </InputGroup>
            <ButtonRow>
              <GhostButton onClick={() => setShowModal(false)}>
                Cancel
              </GhostButton>
              <PrimaryButton onClick={handleCreateTask}>Add Card</PrimaryButton>
            </ButtonRow>
          </Modal>
        </ModalOverlay>
      )}

      {showEditModal && selectedTask && (
        <ModalOverlay onClick={() => setShowEditModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Edit Card</ModalTitle>
            <InputGroup>
              <Label>Title</Label>
              <Input
                value={selectedTask.title}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, title: e.target.value })
                }
              />
            </InputGroup>
            <InputGroup>
              <Label>Description</Label>
              <TextArea
                value={selectedTask.description}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    description: e.target.value,
                  })
                }
              />
            </InputGroup>
            <InputGroup>
              <Label>Priority</Label>
              <Select
                value={selectedTask.priority}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    priority: e.target.value as any,
                  })
                }
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
            </InputGroup>
            <InputGroup>
              <Label>Due Date</Label>
              <Input
                type="date"
                value={selectedTask.dueDate}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, dueDate: e.target.value })
                }
              />
            </InputGroup>
            <ButtonRow>
              <DangerButton onClick={handleDeleteTask}>
                Delete Card
              </DangerButton>
              <GhostButton onClick={() => setShowEditModal(false)}>
                Cancel
              </GhostButton>
              <PrimaryButton onClick={handleUpdateTask}>
                Save Changes
              </PrimaryButton>
            </ButtonRow>
          </Modal>
        </ModalOverlay>
      )}
    </DashboardContainer>
  );
}
