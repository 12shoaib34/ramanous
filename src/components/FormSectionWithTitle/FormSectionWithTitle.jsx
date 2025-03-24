import React from "react";
const SectionWithTitle = ({ children, title = "", subtitle = "" }) => {
  return (
    <div>
      <div className="p-form-item-spacing border border-whisper-gray rounded-t-xl bg-background-secondary">
        <h3 className="text-base font-medium">{title}</h3>
        {subtitle && <span className="text-sm">{subtitle}</span>}
      </div>
      <div className="form-container rounded-none border border-t-transparent border-whisper-gray py-form-item-spacing">
        {children}
      </div>
    </div>
  );
};

export default SectionWithTitle;
