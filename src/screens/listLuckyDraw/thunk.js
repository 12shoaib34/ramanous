import { createAsyncThunk } from "@reduxjs/toolkit";
import { endPoints, invokeApi } from "../../services/services";

export const getLuckyDraws = createAsyncThunk("listLuckyDraw/getLuckyDraws", async (payload = {}) => {
  let response = await invokeApi({ method: "GET", url: endPoints.getLuckyDraws, params: payload });

  return response.data;
});

export const createLuckyDraw = createAsyncThunk("listLuckyDraw/create", async (payload, { rejectWithValue }) => {
  try {
    const response = await invokeApi({
      method: "POST",
      url: endPoints.createLuckyDraw,
      payload,
    });
    // Assuming the API returns the created lucky draw data or a success message
    return response.data;
  } catch (error) {
    // Handle potential errors, possibly returning a specific error structure
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});
