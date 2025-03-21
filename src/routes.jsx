import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";

import { Dashboard, Login, Products } from "./screens";

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
        path: "products",
        Component: Products,
      },
    ],
  },
  {
    path: "login",
    Component: Login,
  },
]);
