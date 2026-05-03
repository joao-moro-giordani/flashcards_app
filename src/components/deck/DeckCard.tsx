import { useNavigate } from "react-router-dom";
import { Layers, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import Dropdown from "../ui/Dropdown";

type Props = {
  id: number;
  name: string;
  color?: string;
};

export const DeckCard: React.FC<Props> = ({ id, name, color }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    console.log("edit", id);
    setOpen(false);
  };

  const handleDelete = () => {
    console.log("delete", id);
    setOpen(false);
  };

  return (
    <div
      onClick={() => navigate(`/decks/${id}`)}
      className="
        relative
        flex items-center justify-between
        p-3 rounded-lg
        bg-gray-900 border border-gray-800
        hover:bg-gray-800 hover:border-gray-700
        transition cursor-pointer
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <Layers size={20} style={{ color: color || "#3B82F6" }} />

        <span className="text-white text-sm font-medium truncate">
          {name}
        </span>
      </div>

      {/* RIGHT ACTION */}
      <div
        className="relative"
        onClick={(e) => e.stopPropagation()} // prevents navigation
      >
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="
            p-1 rounded-md
            text-gray-400 hover:text-white
            hover:bg-gray-700
          "
        >
          <MoreVertical size={18} />
        </button>

        <Dropdown isOpen={open} onClose={() => setOpen(false)}>
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
          >
            <Pencil size={14} />
            Editar
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-gray-800"
          >
            <Trash2 size={14} />
            Excluir
          </button>
        </Dropdown>
      </div>
    </div>
  );
};