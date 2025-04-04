import React from "react";
const SectionWithTitle = ({ children, title = "", subtitle = "", titleSuffix = null }) => {
  // Add titleSuffix prop
  return (
    <div>
      {/* Use flexbox to position title/subtitle and suffix */}
      <div className="flex justify-between items-center p-form-item-spacing border border-whisper-gray rounded-t-xl bg-background-secondary">
        <div>
          {" "}
          {/* Container for title and subtitle */}
          <h3 className="text-base font-medium">{title}</h3>
          {subtitle && <span className="text-sm">{subtitle}</span>}
        </div>
        {titleSuffix && <div>{titleSuffix}</div>} {/* Render suffix if provided */}
      </div>
      <div className="form-container rounded-none border border-t-transparent border-whisper-gray py-form-item-spacing">
        {children}
      </div>
    </div>
  );
};

export default SectionWithTitle;
