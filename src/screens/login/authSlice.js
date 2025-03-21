import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  return new Promise((resolve) => {
    const token = localStorage.getItem("token");
    resolve(!!token);
  });
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoading: true,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
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
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
