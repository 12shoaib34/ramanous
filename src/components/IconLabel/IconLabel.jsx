import React from "react";

const IconLabel = ({ icon = <></>, label, count = null, space = 4, countTheme = "" }) => {
  const renderCountTheme = (countTheme) => {
    switch (countTheme) {
      case "success":
        return "text-success";
      default:
        return "bg-[#EF4D2F] text-white";
    }
  };

  return (
    <div style={{ gap: `${space}px` }} className="flex items-center relative">
      {icon}
      <div className="flex items-center">
        {label}
        {count !== null && (
          <div
            className={`rounded-full h-4 min-w-4 px-1 flex items-center justify-center text-xs relative -top-1 left-1 font-medium ${renderCountTheme(
              countTheme
            )}`}
          >
            <span className="text-xs leading-none font-medium">{count}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default IconLabel;
