import { createAsyncThunk } from "@reduxjs/toolkit";
import { endPoints, invokeApi } from "../services/services";

export const getCountries = createAsyncThunk("common/getCountries", async () => {
  let response = await invokeApi({ method: "GET", url: endPoints.getCountries });

  return response.data;
});

export const getProducts = createAsyncThunk("common/getProducts", async () => {
  let response = await invokeApi({ method: "GET", url: endPoints.getProducts });

  return response.data;
});
