import { createSlice } from "@reduxjs/toolkit";
import { getLuckyDraws } from "./thunk";

const luckyDrawReducer = createSlice({
  name: "listLuckyDraw",
  initialState: {
    isLoading: false,
    luckyDraws: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLuckyDraws.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLuckyDraws.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.luckyDraws = payload;
    });
    builder.addCase(getLuckyDraws.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default luckyDrawReducer.reducer;
