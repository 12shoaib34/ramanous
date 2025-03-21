import { ConfigProvider } from "antd";
import { act, createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const getCSSVariable = (variable) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  };

  const [theme, setTheme] = useState({});

  useEffect(() => {
    setTheme({
      background: getCSSVariable("--background"),
      navBg: getCSSVariable("--nav-bg"),
      backgroundSecondary: getCSSVariable("--background-secondary"),

      colorPrimary: getCSSVariable("--color-primary"),
      colorText: getCSSVariable("--color-text"),
      colorTextLabel: getCSSVariable("--color-text-label"),
      colorErrorBg: getCSSVariable("--color-error-bg"),
      colorFocus: getCSSVariable("--color-focus"),
      errorText: getCSSVariable("--color-error-text"),
      colorError: getCSSVariable("--color-error"),

      // shadows

      activeShadow: getCSSVariable("--active-shadow"),

      // components variables

      inputBorder: getCSSVariable("--input-border"),
      inputBorderHover: getCSSVariable("--input-border-hover"),
      inputBorderActive: getCSSVariable("--input-border-active"),
    });
  }, []);

  console.log(theme);

  return (
    <ThemeContext.Provider value={theme}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: theme.colorPrimary,
            colorText: theme.colorText,

            colorFocus: theme.colorFocus,
            colorError: theme.colorError,
            colorErrorBg: theme.colorErrorBg,
          },
          components: {
            Form: {
              labelColor: theme.colorTextLabel,
            },
            Input: {
              colorBorder: theme.inputBorder,
              colorBorderHover: theme.inputBorderHover,
              colorBorderActive: theme.inputBorderActive,
              activeShadow: theme.activeShadow,
              errorActiveShadow: theme.activeShadow,
              colorErrorBg: "red",
            },
            Button: {
              borderRadius: 8,
            },
            Menu: {
              itemBg: theme.navBg,
              itemSelectedBg: "#ffffff",
              itemActiveBg: "#ffffff",
              itemHoverBg: "#ffffff",
              colorText: theme.colorPrimary,
              itemMarginBlock: 0,
              itemHeight: 28,
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
