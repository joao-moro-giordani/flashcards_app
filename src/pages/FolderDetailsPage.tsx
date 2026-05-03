import PageHeader from "../components/layout/PageHeader";
import BaseButton from "../components/ui/BaseButton";
import { DeckCard } from "../components/deck/DeckCard";
import { Loader } from "../components/ui/Loader";
import { Plus, Folder as FolderIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { useFolder } from "../hooks/useFolder";

export const FolderDetailsPage = () => {
  const { id } = useParams();
  const folderId = Number(id);
  const hasValidId = Number.isFinite(folderId) && folderId > 0;
  const { data: folder, isLoading, isError, error } = useFolder(
    hasValidId ? folderId : undefined,
  );

  if (!hasValidId) {
    return (
      <div className="p-6 bg-black min-h-screen">
        <p className="text-red-400 text-sm">ID inválido</p>
      </div>
    );
  }

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (isError || !folder) {
    return (
      <div className="p-6 bg-black min-h-screen">
        <p className="text-red-400 text-sm">
          {error?.message || "Pasta não encontrada"}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="flex-1">
        
        <PageHeader
          backTo="/folders"
          titleNode={
            <div className="flex items-center gap-2">
              <FolderIcon size={22} style={{ color: folder.color }} />

              <div className="leading-tight">
                <h1 className="text-lg font-semibold text-white">
                  {folder.name}
                </h1>
                <p className="text-gray-400 text-xs">
                  {folder.decks?.length || 0} decks
                </p>
              </div>
            </div>
          }
          actions={
            <BaseButton>
              <div className="flex items-center gap-2">
                <Plus size={16} />
                Adicionar Deck
              </div>
            </BaseButton>
          }
        />

        {/* ✅ EMPTY STATE */}
        {!folder.decks || folder.decks.length === 0 ? (
          <p className="text-gray-400 text-sm mt-6">
            Nenhum deck nesta pasta
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {folder.decks.map((deck) => (
              <DeckCard
                key={deck.id}
                id={deck.id}
                name={deck.name}
                color={deck.color}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};