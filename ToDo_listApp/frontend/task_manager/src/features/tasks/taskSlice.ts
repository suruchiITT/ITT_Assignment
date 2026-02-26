import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/api";

interface TaskState {
  tasks: any[];
  loading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (queryParams: string = "") => {
    return await apiRequest(`/tasks${queryParams}`);
  },
);

export const createTask = createAsyncThunk(
  "tasks/create",
  async (data: any) => {
    return await apiRequest("/tasks", "POST", data);
  },
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }: { id: string; data: any }) => {
    return await apiRequest(`/tasks/${id}`, "PUT", data);
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id: string) => {
    await apiRequest(`/tasks/${id}`, "DELETE");
    return id;
  },
);

export const changeStatus = createAsyncThunk(
  "tasks/status",
  async ({ id, status }: { id: string; status: string }) => {
    return await apiRequest(`/tasks/${id}/status`, "PATCH", {
      status,
    });
  },
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action: any) => {
        state.loading = false;
        state.tasks = action.payload.data;
      })
      .addCase(createTask.fulfilled, (state, action: any) => {
        state.tasks.unshift(action.payload.data);
      })
      .addCase(updateTask.fulfilled, (state, action: any) => {
        const updated = action.payload.data;
        state.tasks = state.tasks.map((task) =>
          task._id === updated._id ? updated : task,
        );
      })
      .addCase(deleteTask.fulfilled, (state, action: any) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(changeStatus.fulfilled, (state, action: any) => {
        const updated = action.payload.data;
        state.tasks = state.tasks.map((task) =>
          task._id === updated._id ? updated : task,
        );
      });
  },
});

export default taskSlice.reducer;
