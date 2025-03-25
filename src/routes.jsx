import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";

import { Dashboard, Login, CreateLuckyDraw, ListLuckyDraw } from "./screens";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "create-lucky-draw",
        Component: CreateLuckyDraw,
      },
      {
        path: "list-lucky-draw",
        Component: ListLuckyDraw,
      },
    ],
  },
  {
    path: "login",
    Component: Login,
  },
]);
