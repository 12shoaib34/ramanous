import React from "react";

const FormContainer = ({ children, divider = false }) => {
  return (
    <div className={`px-form-item-spacing ${divider ? "border-b border-whisper-gray" : ""}`.trim()}>{children}</div>
  );
};

export default FormContainer;
