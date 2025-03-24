import React from "react";

const Section = ({ children, className = "" }) => {
  return <div className={`form-container ${className}`.trim()}>{children}</div>;
};

export default Section;
