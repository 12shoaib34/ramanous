import { createSlice } from "@reduxjs/toolkit";
import { getCountries } from "./thunk";

const commonReducer = createSlice({
  name: "common",
  initialState: {
    isMenuOpen: false,
    countries: {
      data: [],
      loading: false,
    },
  },
  reducers: {
    toggleMenu: (state, { payload }) => {
      state.isMenuOpen = payload || !state.isMenuOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCountries.pending, (state) => {
      state.countries.loading = true;
    });
    builder.addCase(getCountries.fulfilled, (state, { payload }) => {
      state.countries.loading = false;
      state.countries.data = payload;
    });
    builder.addCase(getCountries.rejected, (state) => {
      state.countries.loading = false;
    });
  },
});

export const { toggleMenu } = commonReducer.actions;
export default commonReducer.reducer;
