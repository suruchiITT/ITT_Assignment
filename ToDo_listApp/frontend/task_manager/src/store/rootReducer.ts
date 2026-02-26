import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import taskReducer from "../features/tasks/taskSlice";
import activityReducer from "../features/activity/activitySlice";

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
  activity: activityReducer,
});

export default rootReducer;