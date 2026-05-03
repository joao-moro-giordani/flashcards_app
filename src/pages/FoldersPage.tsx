import { useEffect, useState } from "react";
import FolderCard from "../components/folder/FolderCard";
import PageHeader from "../components/layout/PageHeader";
import BaseButton from "../components/ui/BaseButton";
import { Loader } from "../components/ui/Loader";
import type { Folder } from "../types";
import { folderService } from "../services/folderService";

export const FoldersPage = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const data = await folderService.getFolders();
        setFolders(data);
      } catch (err) {
        setError("Erro ao carregar pastas");
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="p-6 bg-black min-h-screen">
      <PageHeader
        title="Pastas"
        description="Organize seus Decks"
        actions={
          <BaseButton onClick={() => console.log("abrir modal")}>
            + Nova Pasta
          </BaseButton>
        }
      />
      {error && (
        <p className="text-red-400 text-sm mb-4">{error}</p>
      )}
      {folders.length === 0 ? (
        <p className="text-gray-400 text-sm">
          Nenhuma pasta ainda
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {folders.map((folder) => (
            <FolderCard key={folder.id} {...folder} />
          ))}
        </div>
      )}
    </div>
  );
};