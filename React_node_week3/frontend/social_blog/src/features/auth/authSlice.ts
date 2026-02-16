import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import { fetchClient }
from "../../api/fetchClient";

import {
  setToken,
  removeToken
} from "../../utils/token";

interface AuthState {

  user: any;

  token: string | null;

  loading: boolean;

}

const initialState: AuthState = {

  user: null,

  token: localStorage.getItem("token"),

  loading: false,

};

export const registerUser =
createAsyncThunk(

  "auth/register",

  async (formData: FormData)=>{

    return await fetchClient(
      "/register",
      {
        method:"POST",
        body: formData
      }
    );

  }

);

export const loginUser =
createAsyncThunk(

  "auth/login",

  async (
    data:{
      email:string;
      password:string;
    }
  )=>{

    const res =
    await fetchClient(
      "/login",
      {
        method:"POST",
        body: JSON.stringify(data)
      }
    );

    setToken(res.token);

    return res;

  }

);

const authSlice =
createSlice({

  name:"auth",

  initialState,

  reducers:{

    logout(state){

      state.user = null;

      state.token = null;

      removeToken();

    }

  },

  extraReducers(builder){

    builder

    .addCase(
      registerUser.pending,
      (state) => {
        state.loading = true;
      }
    )

    .addCase(
      registerUser.fulfilled,
      (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        setToken(action.payload.token);
      }
    )

    .addCase(
      registerUser.rejected,
      (state) => {
        state.loading = false;
      }
    )

    .addCase(
      loginUser.pending,
      (state) => {
        state.loading = true;
      }
    )

    .addCase(
      loginUser.fulfilled,
      (state,action)=>{

        state.loading = false;
        state.user =
        action.payload.user;

        state.token =
        action.payload.token;

      }
    )

    .addCase(
      loginUser.rejected,
      (state) => {
        state.loading = false;
      }
    );

  }

});

export const {
  logout
} = authSlice.actions;

export default authSlice.reducer;
