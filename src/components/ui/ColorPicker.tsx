import React from "react";

type Props = {
  value: string;
  onChange: (color: string) => void;
  label?: string;
};

const colors = [
  "#3B82F6", // blue
  "#EF4444", // red
  "#10B981", // green
  "#F59E0B", // amber
  "#8B5CF6", // purple
  "#EC4899", // pink
  "#06B6D4", // cyan
  "#F97316", // orange
];

const ColorPicker: React.FC<Props> = ({ value, onChange, label }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="flex gap-2 flex-wrap">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`
              w-8 h-8 rounded-lg transition-all
              ${value === color ? "ring-2 ring-offset-2 ring-blue-500 ring-offset-gray-900" : "hover:scale-110"}
            `}
            style={{ backgroundColor: color }}
            type="button"
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
