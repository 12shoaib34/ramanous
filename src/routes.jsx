import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";

import { Dashboard, Login, CreateLuckyDraw, ListLuckyDraw, Entrants, Draw, AnalyticsEntries, Winners } from "./screens";

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
      {
        path: "draw",
        Component: Draw,
        children: [
          {
            path: "entrants/:id",
            Component: Entrants,
          },
          {
            path: "analytics-entries/:id",
            Component: AnalyticsEntries,
          },
          {
            path: "winners/:id",
            Component: Winners,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    Component: Login,
  },
]);
