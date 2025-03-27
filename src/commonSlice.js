import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  return new Promise((resolve) => {
    const token = localStorage.getItem("token");
    resolve(!!token);
  });
});

const commonSlice = createSlice({
  name: "common",
  initialState: {
    isMenuOpen: false,
  },
  reducers: {
    toggleMenu: (state, { payload }) => {
      state.isMenuOpen = payload || !state.isMenuOpen;
    },
  },
  extraReducers: (builder) => {},
});

export const { toggleMenu } = commonSlice.actions;
export default commonSlice.reducer;
