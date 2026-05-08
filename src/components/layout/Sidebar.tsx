import { Folder } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-gray-950 border-r border-gray-800 p-4 flex flex-col justify-between">
      
      {/* Top Section */}
      <div className="flex flex-col gap-6">
        
        {/* App Title */}
        <div className="text-lg font-semibold text-white">
          Flashcards App
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate("/folders")}
            className={`
              text-left px-3 py-2 rounded-lg text-sm
              transition-colors
              ${
                isActive("/folders")
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }
            `}
          >
          <div className="ml-1 inline-block">Pastas</div>   
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;