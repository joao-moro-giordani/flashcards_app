import React from "react";

type Props = {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
};

const sizeMap = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-10 h-10 border-4",
};

export const Loader: React.FC<Props> = ({ size = "md", fullScreen = false }) => {
  const spinner = (
    <div
      className={`
        ${sizeMap[size]}
        border-gray-700 border-t-blue-500
        rounded-full animate-spin
      `}
    />
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-6">
      {spinner}
    </div>
  );
};