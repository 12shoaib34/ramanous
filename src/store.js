import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./common/slice";
import authReducer from "./screens/login/slice";
import luckyDrawReducer from "./screens/listLuckyDraw/slice";

export default configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
    luckyDraws: luckyDrawReducer,
  },
});
