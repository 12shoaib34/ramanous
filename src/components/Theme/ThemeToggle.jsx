import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="px-4 py-2 rounded bg-filled-brand text-white hover:bg-hover-brand active:bg-active-brand"
      >
        Toggle Theme (Current: {theme})
      </button>
      <button
        onClick={() => setTheme("system")}
        className="px-4 py-2 rounded bg-transparent-hover text-text-primary hover:bg-transparent-active"
      >
        Reset to System
      </button>
    </div>
  );
};

export default ThemeToggle;
