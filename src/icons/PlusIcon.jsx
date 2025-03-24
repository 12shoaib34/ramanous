import React from "react";

const PlusIcon = (props) => {
  const { className = "" } = props;
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.25 14.25C9.25 14.6642 9.58579 15 10 15C10.4142 15 10.75 14.6642 10.75 14.25V10.75H14.25C14.6642 10.75 15 10.4142 15 10C15 9.58579 14.6642 9.25 14.25 9.25H10.75V5.75C10.75 5.33579 10.4142 5 10 5C9.58579 5 9.25 5.33579 9.25 5.75V9.25H5.75C5.33579 9.25 5 9.58579 5 10C5 10.4142 5.33579 10.75 5.75 10.75H9.25V14.25Z"
        fill="#4A4A4A"
      />
    </svg>
  );
};

export default PlusIcon;
