import { useState } from "react";
import FolderCard from "../components/folder/FolderCard";
import PageHeader from "../components/layout/PageHeader";
import BaseButton from "../components/ui/BaseButton";
import { Loader } from "../components/ui/Loader";
import Modal from "../components/ui/Modal";
import FolderForm from "../components/folder/FolderForm";
import { useFolders } from "../hooks/useFolders";
import { useCreateFolder, useUpdateFolder, useDeleteFolder } from "../hooks/useFolderMutations";

export const FoldersPage = () => {
  const { data: folders = [], isLoading, isError, error } = useFolders();
  const createFolderMutation = useCreateFolder();
  const updateFolderMutation = useUpdateFolder();
  const deleteFolderMutation = useDeleteFolder();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const handleCreateFolder = async (data: { name: string; color: string }) => {
    await createFolderMutation.mutateAsync(data);
    setIsModalOpen(false);
  };

  const handleUpdateFolder = async (data: { name: string; color: string }) => {
    if (editingFolder !== null) {
      await updateFolderMutation.mutateAsync({ id: editingFolder, payload: data });
      setEditingFolder(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteFolder = async (id: number) => {
    await deleteFolderMutation.mutateAsync(id);
    setConfirmDeleteId(null);
  };

  const openCreateModal = () => {
    setEditingFolder(null);
    setIsModalOpen(true);
  };

  const openEditModal = (id: number) => {
    setEditingFolder(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingFolder(null);
  };

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="p-6 bg-black min-h-screen">
      <PageHeader
        title="Pastas"
        description="Organize seus Decks"
        actions={
          <BaseButton onClick={openCreateModal}>
            + Nova Pasta
          </BaseButton>
        }
      />
      {isError && (
        <p className="text-red-400 text-sm mb-4">
          {error?.message ?? "Erro ao carregar pastas"}
        </p>
      )}
      {folders.length === 0 ? (
        <p className="text-gray-400 text-sm">
          Nenhuma pasta ainda
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {folders.map((folder) => (
            <FolderCard
              key={folder.id}
              {...folder}
              onEdit={() => openEditModal(folder.id)}
              onDelete={() => setConfirmDeleteId(folder.id)}
            />
          ))}
        </div>
      )}

      {/* Modal de Criar/Editar Pasta */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingFolder ? "Editar Pasta" : "Nova Pasta"}
      >
        <FolderForm
          folder={editingFolder ? folders.find((f) => f.id === editingFolder) : undefined}
          onSubmit={editingFolder ? handleUpdateFolder : handleCreateFolder}
          isLoading={
            editingFolder
              ? updateFolderMutation.isPending
              : createFolderMutation.isPending
          }
        />
      </Modal>

      {/* Confirmação de Exclusão */}
      {confirmDeleteId !== null && (
        <Modal
          isOpen={true}
          onClose={() => setConfirmDeleteId(null)}
          title="Confirmar Exclusão"
          size="sm"
        >
          <div>
            <p className="text-gray-300 mb-6">
              Tem certeza que deseja deletar esta pasta? Todos os decks serão removidos.
            </p>
            <div className="flex gap-2 justify-end">
              <BaseButton
                variant="ghost"
                onClick={() => setConfirmDeleteId(null)}
              >
                Cancelar
              </BaseButton>
              <BaseButton
                variant="danger"
                onClick={() => handleDeleteFolder(confirmDeleteId)}
                disabled={deleteFolderMutation.isPending}
              >
                {deleteFolderMutation.isPending ? "Deletando..." : "Deletar"}
              </BaseButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};