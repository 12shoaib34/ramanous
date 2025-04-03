import { createSlice } from "@reduxjs/toolkit";
import { createLuckyDraw, getLuckyDraws } from "./thunk";

const luckyDrawReducer = createSlice({
  name: "listLuckyDraw",
  initialState: {
    isLoading: false,
    createLuckyDrawLoading: false,
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

    builder.addCase(createLuckyDraw.pending, (state) => {
      state.createLuckyDrawLoading = true;
    });
    builder.addCase(createLuckyDraw.fulfilled, (state) => {
      state.createLuckyDrawLoading = false;
    });
    builder.addCase(createLuckyDraw.rejected, (state) => {
      state.createLuckyDrawLoading = false;
    });
  },
});

export default luckyDrawReducer.reducer;
