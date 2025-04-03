import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, signin } from "./thunk";
import { appTokenKey } from "../../utils/constants";

const authReducer = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoading: true,
    signinLoading: false,
    user: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem(appTokenKey);
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      });

    builder
      .addCase(signin.pending, (state) => {
        state.signinLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.signinLoading = false;
        state.isAuthenticated = true;
        state.user = null;
      })
      .addCase(signin.rejected, (state) => {
        state.signinLoading = false;
      });
  },
});

export const { logout } = authReducer.actions;
export default authReducer.reducer;
