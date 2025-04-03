import { createAsyncThunk } from "@reduxjs/toolkit";
import { endPoints, invokeApi } from "../../services/services";

export const getLuckyDraws = createAsyncThunk("listLuckyDraw/getLuckyDraws", async (payload = {}) => {
  let response = await invokeApi({ method: "GET", url: endPoints.getLuckyDraws, params: payload });

  return response.data;
});
