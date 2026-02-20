import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import {
  fetchProfileApi,
  fetchUsersApi,
  followUserApi,
  unfollowUserApi
} from "../../api/userApi";

export const fetchProfile = createAsyncThunk(
  "users/profile",
  async () => {
    return await fetchProfileApi();
  }
);

export const fetchUsers = createAsyncThunk(
  "users/all",
  async () => {
    return await fetchUsersApi();
  }
);

export const followUser = createAsyncThunk(
  "users/follow",
  async (id: string) => {
    await followUserApi(id);
    return id;
  }
);

export const unfollowUser = createAsyncThunk(
  "users/unfollow",
  async (id: string) => {
    await unfollowUserApi(id);
    return id;
  }
);

const userSlice = createSlice({

  name: "users",

  initialState: {
    profile: null as any,
    users: [] as any[]
  },

  reducers: {},

  extraReducers(builder) {

    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });

  }

});

export default userSlice.reducer;
