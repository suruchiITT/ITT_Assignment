import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import postReducer from "./posts/postSlice";
import userReducer from "./users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    users: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
