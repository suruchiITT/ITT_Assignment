import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/api";

interface ActivityState {
  logs: any[];
  loading: boolean;
  page: number;
}

const initialState: ActivityState = {
  logs: [],
  loading: false,
  page: 1,
};

export const fetchActivities = createAsyncThunk(
  "activity/fetch",
  async (page: number = 1) => {
    return await apiRequest(`/activities?page=${page}&limit=10`);
  },
);

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActivities.fulfilled, (state, action: any) => {
        state.loading = false;
        state.logs = action.payload.data;
      })
      .addCase(fetchActivities.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default activitySlice.reducer;
