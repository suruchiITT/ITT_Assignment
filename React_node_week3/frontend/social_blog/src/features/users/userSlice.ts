import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import { fetchClient }
from "../../api/fetchClient";

export interface User {

  _id: string;

  username: string;

  email: string;

  profilePic?: string;

  followers: string[];

  following: string[];

}

interface UserState {

  profile: User | null;

  allUsers: User[];

  followers: User[];

  following: User[];

  loading: boolean;

}

const initialState: UserState = {

  profile: null,

  allUsers: [],

  followers: [],

  following: [],

  loading: false,

};

export const fetchProfile =
createAsyncThunk(

  "users/profile",

  async ()=>{

    return await fetchClient(
      "/profile"
    );

  }

);

export const updateProfile =
createAsyncThunk(

  "users/updateProfile",

  async (formData: FormData)=>{

    return await fetchClient(

      "/profile",

      {

        method:"PUT",

        body: formData

      }

    );

  }

);

export const fetchUsers =
createAsyncThunk(

  "users/allUsers",

  async ()=>{

    return await fetchClient(
      "/users"
    );

  }

);

export const followUser =
createAsyncThunk(

  "users/follow",

  async (userId: string)=>{

    await fetchClient(

      `/follow/${userId}`,

      {

        method:"POST"

      }

    );

    return userId;

  }

);

export const unfollowUser =
createAsyncThunk(

  "users/unfollow",

  async (userId: string)=>{

    await fetchClient(

      `/follow/${userId}`,

      {

        method:"DELETE"

      }

    );

    return userId;

  }

);
export const fetchUserById =
createAsyncThunk(

  "users/fetchUserById",

  async (userId:string)=>{

    const res =
    await fetchClient(
      `/users/${userId}`
    );

    return res;

  }

);


export const fetchFollowers =
createAsyncThunk(

  "users/fetchFollowers",

  async ()=>{

    return await fetchClient(
      "/followers"
    );

  }

);

export const fetchFollowing =
createAsyncThunk(

  "users/fetchFollowing",

  async ()=>{

    return await fetchClient(
      "/following"
    );

  }

);

const userSlice =
createSlice({

  name:"users",

  initialState,

  reducers:{},

  extraReducers(builder){

    builder

    .addCase(fetchProfile.fulfilled,
    (state,action)=>{

      state.profile =
      action.payload;

    })

    .addCase(updateProfile.fulfilled,
    (state,action)=>{

      state.profile =
      action.payload.user;

    })

    .addCase(fetchUsers.fulfilled,
    (state,action)=>{

      state.allUsers =
      action.payload;

    })

    .addCase(fetchFollowers.fulfilled,
    (state,action)=>{

      state.followers =
      action.payload;

    })

    .addCase(fetchFollowing.fulfilled,
    (state,action)=>{

      state.following =
      action.payload;

    })

    .addCase(followUser.fulfilled,
    (state,action)=>{

      if(state.profile){

        state.profile.following.push(
          action.payload
        );

      }

    })

    .addCase(unfollowUser.fulfilled,
    (state,action)=>{

      if(state.profile){

        state.profile.following =
        state.profile.following.filter(

          id => id !== action.payload

        );

      }

    });

  }

});

export default userSlice.reducer;
