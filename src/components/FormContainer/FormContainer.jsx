import React from "react";

const FormContainer = ({ children, divider = false, className = "" }) => {
  return (
    <div className={`px-form-item-spacing ${className} ${divider ? "border-b border-whisper-gray" : ""}`.trim()}>
      {children}
    </div>
  );
};

export default FormContainer;
