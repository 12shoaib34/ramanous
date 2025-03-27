import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./commonSlice";
import authReducer from "./screens/login/authSlice";

export default configureStore({
  reducer: {
    common: commonSlice,
    auth: authReducer,
  },
});
