import React from "react";

const HomeIcon = ({ className = "" }) => {
  return (
    <svg
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M14 16H12C11.4477 16 11 15.5523 11 15V12.5C11 12.2239 10.7761 12 10.5 12H9.5C9.22386 12 9 12.2239 9 12.5V15C9 15.5523 8.55228 16 8 16H6C4.89543 16 4 15.1046 4 14V9.74264C4 8.94699 4.31607 8.18393 4.87868 7.62132L8.58579 3.91422C9.36684 3.13317 10.6332 3.13317 11.4142 3.91422L15.1213 7.62132C15.6839 8.18393 16 8.94699 16 9.74264V14C16 15.1046 15.1046 16 14 16Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default HomeIcon;
