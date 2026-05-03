import { useNavigate } from "react-router-dom";
import { Folder, MoreVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import Dropdown from "../ui/Dropdown";

type Props = {
  id: number;
  name: string;
  color?: string;
};

const FolderCard: React.FC<Props> = ({ id, name, color }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
        flex items-center justify-between
        p-3 rounded-lg
        bg-gray-900 border border-gray-800
        hover:bg-gray-800 hover:border-gray-700
        transition
      "
    >
      {/* Left (navigation) */}
      <div
        onClick={() => navigate(`/folders/${id}`)}
        className="flex items-center gap-3 flex-1 cursor-pointer"
      >
        <Folder size={20} style={{ color: color || "#3B82F6" }} />
        <span className="text-white text-sm font-medium truncate">
          {name}
        </span>
      </div>

      {/* Right (menu) */}
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
          className="
            p-2 rounded-md
            text-gray-400
            hover:text-white hover:bg-gray-700
            transition
          "
        >
          <MoreVertical size={18} />
        </button>

        <Dropdown isOpen={open} onClose={() => setOpen(false)}>
          <button
            className="
              flex items-center gap-2 w-full px-3 py-2 text-sm
              text-gray-200 hover:bg-gray-800
            "
          >
            <Pencil size={14} />
            Editar
          </button>

          <button
            className="
              flex items-center gap-2 w-full px-3 py-2 text-sm
              text-red-400 hover:bg-gray-800
            "
          >
            <Trash size={14} />
            Deletar 
          </button>
        </Dropdown>
      </div>
    </div>
  );
};

export default FolderCard;