import React from "react";

const Button = (props) => {
  const { children, theme = "primary", ...rest } = props;

  const renderTheme = () => {
    const prefix =
      "btn px-300 py-150 rounded-lg focus:outline-2 focus:outline-focus focus:outline-offset-[2px] m-0.5 disabled:bg-disabled disabled:text-disabled-text disabled:cursor-not-allowed disabled:border-none";

    let getTheme = () => {
      switch (theme) {
        case "primary":
          return "btn-primary bg-filled-brand text-filled-white hover:bg-hover-brand active:bg-active-brand active:text-filled-bg-text disabled:bg-disabled-brand disabled:text-brand-bg-disabled-text";
        case "secondary":
          return "";
      }
    };

    return `${prefix} ${getTheme()}`;
  };

  return (
    <button {...rest} className={renderTheme()}>
      {children}
    </button>
  );
};

export default Button;
