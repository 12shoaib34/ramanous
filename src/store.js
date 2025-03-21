import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./screens/login/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
