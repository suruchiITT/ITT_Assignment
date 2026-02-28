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
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ActivityLog from "../components/ActivityLog";
import TaskCard from "../components/TaskCard";
import TaskColumn from "../components/TaskColumn";
import TaskModal from "../components/TaskModal";
import Pagination from "../components/Pagination";
import {
  DashboardContainer,
  Header,
  Title,
  LogoutButton,
  Board,
  FilterBar,
  FilterItem,
  MainLayout,
  ContentArea,
  ActivitySidebar,
  SidebarHeader,
  SidebarTitle,
  SidebarContent,
  HeaderActions,
  WhiteLabel,
  SmallInput,
  SmallSelect,
  CloseSidebarButton,
} from "../styles/DashboardStyles";

interface ITask {
  _id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Todo" | "In Progress" | "Done";
  dueDate: string;
}

const ITEMS_PER_PAGE = 5;

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tasks } = useAppSelector((state) => state.tasks);

  const [filters, setFilters] = useState({
    priority: "",
    status: "",
    dueDate: "",
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [activeColumn, setActiveColumn] = useState<string>("Todo");

  const [todoPage, setTodoPage] = useState(1);
  const [progressPage, setProgressPage] = useState(1);
  const [donePage, setDonePage] = useState(1);

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

  const handleCreateTask = async (data: any) => {
    await dispatch(createTask({ ...data, status: activeColumn }));
    setShowCreateModal(false);
    if (activeColumn === "Todo") setTodoPage(1);
    if (activeColumn === "In Progress") setProgressPage(1);
    if (activeColumn === "Done") setDonePage(1);
  };

  const handleCardClick = (task: ITask) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleUpdateTask = async (data: any) => {
    if (selectedTask) {
      await dispatch(updateTask({ id: selectedTask._id, data }));
      setShowEditModal(false);
      setSelectedTask(null);
    }
  };

  const handleDeleteTask = async () => {
    if (selectedTask && window.confirm("Are you sure you want to delete this card?")) {
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

  const todoTasks = tasks.filter((t) => t.status === "Todo");
  const progressTasks = tasks.filter((t) => t.status === "In Progress");
  const doneTasks = tasks.filter((t) => t.status === "Done");

  const paginate = (items: any[], page: number) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return items.slice(start, start + ITEMS_PER_PAGE);
  };

  return (
    <DashboardContainer>
      <Header>
        <Title>Task Manager</Title>
        <HeaderActions>
          <LogoutButton onClick={() => setShowActivity(!showActivity)}>
            {showActivity ? "Hide Activity" : "Show Activity"}
          </LogoutButton>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </HeaderActions>
      </Header>

      <MainLayout>
        <ContentArea>
          <FilterBar>
            <FilterItem>
              <WhiteLabel>Priority:</WhiteLabel>
              <SmallSelect
                value={filters.priority}
                onChange={(e) =>
                  setFilters({ ...filters, priority: e.target.value })
                }
              >
                <option value="">All</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </SmallSelect>
            </FilterItem>

            <FilterItem>
              <WhiteLabel>Status:</WhiteLabel>
              <SmallSelect
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">All</option>
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </SmallSelect>
            </FilterItem>

            <FilterItem>
              <WhiteLabel>Due Date:</WhiteLabel>
              <SmallInput
                type="date"
                value={filters.dueDate}
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
              <TaskColumn
                id="Todo"
                title="TO DO"
                onAddCard={() => {
                  setActiveColumn("Todo");
                  setShowCreateModal(true);
                }}
                footer={
                  <Pagination
                    currentPage={todoPage}
                    totalPages={Math.ceil(todoTasks.length / ITEMS_PER_PAGE)}
                    onPageChange={setTodoPage}
                  />
                }
              >
                <SortableContext
                  items={todoTasks.map((t) => t._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {paginate(todoTasks, todoPage).map((task: ITask) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onClick={handleCardClick}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </SortableContext>
              </TaskColumn>

              <TaskColumn
                id="In Progress"
                title="IN PROGRESS"
                onAddCard={() => {
                  setActiveColumn("In Progress");
                  setShowCreateModal(true);
                }}
                footer={
                  <Pagination
                    currentPage={progressPage}
                    totalPages={Math.ceil(progressTasks.length / ITEMS_PER_PAGE)}
                    onPageChange={setProgressPage}
                  />
                }
              >
                <SortableContext
                  items={progressTasks.map((t) => t._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {paginate(progressTasks, progressPage).map((task: ITask) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onClick={handleCardClick}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </SortableContext>
              </TaskColumn>

              <TaskColumn
                id="Done"
                title="DONE"
                onAddCard={() => {
                  setActiveColumn("Done");
                  setShowCreateModal(true);
                }}
                footer={
                  <Pagination
                    currentPage={donePage}
                    totalPages={Math.ceil(doneTasks.length / ITEMS_PER_PAGE)}
                    onPageChange={setDonePage}
                  />
                }
              >
                <SortableContext
                  items={doneTasks.map((t) => t._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {paginate(doneTasks, donePage).map((task: ITask) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onClick={handleCardClick}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </SortableContext>
              </TaskColumn>
            </Board>
          </DndContext>
        </ContentArea>

        <ActivitySidebar show={showActivity}>
          <SidebarHeader>
            <SidebarTitle>Activity Log</SidebarTitle>
            <CloseSidebarButton onClick={() => setShowActivity(false)}>
              ✕
            </CloseSidebarButton>
          </SidebarHeader>
          <SidebarContent>
            <ActivityLog />
          </SidebarContent>
        </ActivitySidebar>
      </MainLayout>

      <TaskModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateTask}
        title="Create Card"
        submitText="Add Card"
      />

      <TaskModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedTask(null);
        }}
        onSave={handleUpdateTask}
        onDelete={handleDeleteTask}
        title="Edit Card"
        submitText="Save Changes"
        initialData={selectedTask}
      />
    </DashboardContainer>
  );
}
