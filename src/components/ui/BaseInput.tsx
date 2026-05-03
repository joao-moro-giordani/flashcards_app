import React from "react";

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const BaseInput: React.FC<Props> = ({
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        px-4 py-2 rounded-lg
        bg-gray-900 border border-gray-700
        text-white placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-600
        ${className}
      `}
    />
  );
};

export default BaseInput;