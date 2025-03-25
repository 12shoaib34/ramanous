import React from "react";

const TrophyIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
    >
      <path
        d="M4.66667 14.5V13.1667H7.33333V11.1C6.78889 10.9778 6.30289 10.7473 5.87533 10.4087C5.44778 10.07 5.13378 9.64489 4.93333 9.13333C4.1 9.03333 3.40289 8.66956 2.842 8.042C2.28111 7.41444 2.00044 6.67822 2 5.83333V5.16667C2 4.8 2.13067 4.48622 2.392 4.22533C2.65333 3.96444 2.96711 3.83378 3.33333 3.83333H4.66667V2.5H11.3333V3.83333H12.6667C13.0333 3.83333 13.3473 3.964 13.6087 4.22533C13.87 4.48667 14.0004 4.80044 14 5.16667V5.83333C14 6.67778 13.7193 7.414 13.158 8.042C12.5967 8.67 11.8996 9.03378 11.0667 9.13333C10.8667 9.64444 10.5529 10.0696 10.1253 10.4087C9.69778 10.7478 9.21156 10.9782 8.66667 11.1V13.1667H11.3333V14.5H4.66667ZM4.66667 7.7V5.16667H3.33333V5.83333C3.33333 6.25556 3.45556 6.63622 3.7 6.97533C3.94444 7.31445 4.26667 7.556 4.66667 7.7ZM11.3333 7.7C11.7333 7.55556 12.0556 7.31378 12.3 6.97467C12.5444 6.63556 12.6667 6.25511 12.6667 5.83333V5.16667H11.3333V7.7Z"
        fill="#1A1A1A"
      />
    </svg>
  );
};

export default TrophyIcon;
