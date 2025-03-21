import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import store from "./store";
import { ThemeProvider } from "./components/Theme/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
