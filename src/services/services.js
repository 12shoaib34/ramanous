import { notification } from "antd";
import { appTokenKey } from "../utils/constants";
import axios from "axios";

const baseUrl = "http://192.168.0.116:3000";

const endPoints = {
  signin: "/signin",
  getLuckyDraws: "/luckyDraw/my-luckyDraw",
  getCountries: "/country",
  getProducts: "/product",
};

const invokeApi = async ({ method = "GET", url, payload = {}, params = {}, headers = {} }) => {
  try {
    const token = localStorage.getItem(appTokenKey);

    const response = await axios({
      method,
      url: `${baseUrl}${url}`,
      data: payload,
      params,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        ...headers,
      },
    });

    return response;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      console.error(`API Error: ${status} - ${data?.message || "Unknown error"}`);

      if (status === 401) {
        localStorage.clear();
        window.location.reload();
      }
    } else {
      notification.error({ message: error.message });
    }

    throw error;
  }
};

export { baseUrl, endPoints, invokeApi };
