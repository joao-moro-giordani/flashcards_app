import { Folder } from "lucide-react";

export const FolderHeader = ({ name, color, deckCount }: any) => {
  return (
    <div className="flex items-center gap-3">
      <Folder size={26} style={{ color: color }} />

      <div>
        <h1 className="text-xl font-semibold text-white">{name}</h1>
        <p className="text-gray-400 text-sm">
          {deckCount} decks
        </p>
      </div>
    </div>
  );
};