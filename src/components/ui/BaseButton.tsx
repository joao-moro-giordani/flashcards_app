import React from "react";

type ButtonVariant = "primary" | "warning" | "danger" | "ghost";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  warning: "bg-yellow-600 hover:bg-yellow-700 text-black",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  ghost: "bg-transparent hover:bg-gray-800 text-white",
};

const BaseButton: React.FC<Props> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium
        transition-colors duration-200
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default BaseButton;