import React from "react";

const IconLabel = ({
  icon = <></>,
  label,
  count = null,
  space = 4,
  countTheme = "",
  onClick = () => {},
  role = "",
  textSize = "text-xs",
  iconClass = "",
}) => {
  const renderCountTheme = (countTheme) => {
    switch (countTheme) {
      case "success":
        return "text-success";
      default:
        return "bg-[#EF4D2F] text-white";
    }
  };

  const renderIconLabelClass = () => {
    let className = "flex items-center relative";

    if (role === "button") {
      className += " cursor-pointer hover:opacity-80 active:opacity-100 select-none";
    }

    return className;
  };

  return (
    <div onClick={onClick} role={role} style={{ gap: `${space}px` }} className={`${renderIconLabelClass()}`}>
      <span className={`leading-none ${iconClass}`}>{icon}</span>
      <div className={`flex items-center ${textSize}`}>
        {label}
        {count !== null && (
          <div
            className={`rounded-full h-4 min-w-4 px-1 flex items-center justify-center relative -top-1 left-1 font-medium ${renderCountTheme(
              countTheme
            )}`}
          >
            <span className="leading-none font-medium">{count}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default IconLabel;
