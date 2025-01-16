import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotPassword  from "./slices/forgot_resetPasswordSlice";
import skillReducer from "./slices/skillSlice";
import projectReducer from "./slices/projectSlice";
import timelineReducer from "./slices/timelineSlice";
import softwareApplicationReducer from "./slices/softwareApplicationSlice";
import messageReducer from "./slices/messageSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    user:userReducer,
    forgotPassword:forgotPassword,
    skill: skillReducer,
    project: projectReducer,
    timeline: timelineReducer,
    softwareApplications: softwareApplicationReducer,
    messages: messageReducer,
  },
});
