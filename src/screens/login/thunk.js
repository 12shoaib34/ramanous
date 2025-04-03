import { createAsyncThunk } from "@reduxjs/toolkit";
import { invokeApi, endPoints } from "../../services/services";
import { appTokenKey } from "../../utils/constants";

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  return new Promise((resolve) => {
    const token = localStorage.getItem(appTokenKey);
    resolve(!!token);
  });
});

export const signin = createAsyncThunk("auth/signin", async (payload) => {
  let response = await invokeApi({ method: "POST", url: endPoints.signin, payload });
  localStorage.setItem(appTokenKey, response.data);
});
