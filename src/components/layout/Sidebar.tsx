import { useNavigate, useLocation } from "react-router-dom";
import BaseButton from "../ui/BaseButton";

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
            📚 Pastas   
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div>
        <BaseButton
          className="w-full"
          onClick={() => {
            // later: open modal
            console.log("Add Folder");
          }}
        >
          + Nova Pasta
        </BaseButton>
      </div>
    </aside>
  );
};

export default Sidebar;