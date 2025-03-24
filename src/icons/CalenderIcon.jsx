import React from "react";

const CalenderIcon = (props) => {
  const { className = "" } = props;
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="19"
      viewBox="0 0 16 19"
      fill="none"
    >
      <path
        fill="#808080"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.6 2.23058H14.4C15.28 2.23058 16 2.95058 16 3.83058V16.6306C16 17.5106 15.28 18.2306 14.4 18.2306H1.6C0.72 18.2306 0 17.5106 0 16.6306V3.83058C0 2.95058 0.72 2.23058 1.6 2.23058H2.4V1.43058C2.4 0.990585 2.76 0.630585 3.2 0.630585C3.64 0.630585 4 0.990585 4 1.43058V2.23058H12V1.43058C12 0.990585 12.36 0.630585 12.8 0.630585C13.24 0.630585 13.6 0.990585 13.6 1.43058V2.23058ZM2.4 16.6306H13.6C14.04 16.6306 14.4 16.2706 14.4 15.8306V6.23058H1.6V15.8306C1.6 16.2706 1.96 16.6306 2.4 16.6306Z"
      />
    </svg>
  );
};

export default CalenderIcon;
