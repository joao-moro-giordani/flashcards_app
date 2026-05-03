import { useEffect, useRef } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Dropdown: React.FC<Props> = ({ isOpen, onClose, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="
        absolute right-0 mt-2 w-36
        bg-gray-900 border border-gray-700
        rounded-lg shadow-lg
        overflow-hidden z-20
      "
    >
      {children}
    </div>
  );
};

export default Dropdown;