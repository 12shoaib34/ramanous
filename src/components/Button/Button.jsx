import React from "react";

const Button = ({
  children,
  theme = "primary",
  icon = null,
  size = "",
  padding = "",
  rounded = "",
  shape = "",
  iconGap = "gap-2",
  textColor = "",
  loading = false,
  disabled = false,
  htmlType = "button",
  className = "",
  ...rest
}) => {
  const renderTheme = () => {
    const prefix =
      "m-0.5 disabled:cursor-not-allowed disabled:text-[#B5B5B5] disabled:border-none focus:shadow-active duration-200 font-semibold cursor-pointer";

    let getTheme = () => {
      switch (theme) {
        case "primary":
          return "bg-button-primary hover:bg-button-primary-hover active:bg-button-primary-active disabled:bg-button-primary-disabled";
        case "secondary":
          return "bg-button-secondary hover:bg-button-secondary-hover active:bg-button-secondary-active disabled:bg-button-secondary-disabled";
        case "tertiary-primary":
        case "tertiary-secondary":
          return "bg-button-tertiary hover:bg-button-tertiary-hover active:bg-button-tertiary-active disabled:bg-button-tertiary-disabled";
        case "light-primary":
        case "light-secondary":
          return "bg-transparent hover:bg-[#0000000D] active:bg-[#00000014] disabled:bg-transparent";
        case "outlined-primary":
          return "bg-transparent border border-button-primary hover:bg-button-primary-hover active:bg-button-primary-active disabled:bg-button-primary-disabled";

        case "light":
          return "bg-transparent active:opacity-70 hover:opacity-100 disabled:opacity-50 ";
      }
    };

    const getColor = () => {
      if (textColor) return textColor;

      switch (theme) {
        case "primary":
        case "secondary":
          return "text-white disabled:text-white";
        case "tertiary-primary":
          return "text-button-primary";
        case "tertiary-secondary":
          return "text-button-secondary";
        case "light-primary":
          return "text-button-primary";
        case "light-secondary":
          return "text-button-secondary";
        case "outlined-primary":
          return "text-button-primary hover:text-white";
        case "light":
          return "text-primary";
        default:
          return "text-white";
      }
    };

    const getSize = () => {
      if (padding) return padding;

      if (shape === "circle") {
        switch (size) {
          case "small":
            return "px-100 py-100";
          case "medium":
            return "px-150 py-150";
          case "large":
            return "px-200 py-200";
          case "fit":
            return "p-0 leading-none focus:shadow-none";

          default:
            return "px-150 py-150 rounded-full";
        }
      } else {
        switch (size) {
          case "small":
            return "px-100 py-50";
          case "medium":
            return "px-200 py-100";
          case "large":
            return "px-400 py-200";
          case "fit":
            return "p-0 leading-none";

          default:
            return "px-300 py-150";
        }
      }
    };

    const getShape = () => {
      if (size === "fit") return "";
      if (rounded && shape !== "circle") return rounded;

      switch (shape) {
        case "circle":
          return "rounded-full";
        case "square":
          return "rounded-md";
        default:
          return "rounded-lg";
      }
    };

    return `${prefix} ${getTheme()} ${getColor()} ${getSize()} ${getShape()}`.trim();
  };

  return (
    <button type={htmlType} disabled={disabled || loading} {...rest} className={`${className} ${renderTheme()}`.trim()}>
      <span className={`flex items-center justify-center ${iconGap}`}>
        {icon && icon} {children}
      </span>
    </button>
  );
};

export default Button;
