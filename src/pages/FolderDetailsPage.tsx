import { useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import BaseButton from "../components/ui/BaseButton";
import { DeckCard } from "../components/deck/DeckCard";
import { Loader } from "../components/ui/Loader";
import Modal from "../components/ui/Modal";
import DeckForm from "../components/deck/DeckForm";
import { Plus, Folder as FolderIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { useFolder } from "../hooks/useFolder";
import { useCreateDeck, useUpdateDeck, useDeleteDeck } from "../hooks/useDeckMutations";

export const FolderDetailsPage = () => {
  const { id } = useParams();
  const folderId = Number(id);
  const hasValidId = Number.isFinite(folderId) && folderId > 0;
  const { data: folder, isLoading, isError, error } = useFolder(
    hasValidId ? folderId : undefined,
  );

  const createDeckMutation = useCreateDeck();
  const updateDeckMutation = useUpdateDeck();
  const deleteDeckMutation = useDeleteDeck();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeckId, setEditingDeckId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const editingDeck = editingDeckId
    ? folder?.decks?.find((d) => d.id === editingDeckId)
    : undefined;

  const handleCreateDeck = async (data: {
    name: string;
    color: string;
    folderId: number;
  }) => {
    await createDeckMutation.mutateAsync(data);
    setIsModalOpen(false);
  };

  const handleUpdateDeck = async (data: {
    name: string;
    color: string;
    folderId: number;
  }) => {
    if (editingDeckId !== null) {
      await updateDeckMutation.mutateAsync({
        id: editingDeckId,
        payload: data,
      });
      setEditingDeckId(null);
      setIsModalOpen(false);
    }
  };

const handleDeleteDeck = async (id: number) => {
  await deleteDeckMutation.mutateAsync({
    deckId: id,
    folderId,
  });

  setConfirmDeleteId(null);
};

  const openCreateModal = () => {
    setEditingDeckId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (id: number) => {
    setEditingDeckId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDeckId(null);
  };

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
            <BaseButton onClick={openCreateModal}>
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
                onEdit={() => openEditModal(deck.id)}
                onDelete={() => setConfirmDeleteId(deck.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de Criar/Editar Deck */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingDeckId ? "Editar Deck" : "Novo Deck"}
      >
        <DeckForm
          deck={editingDeck}
          folderId={folderId}
          onSubmit={editingDeckId ? handleUpdateDeck : handleCreateDeck}
          isLoading={
            editingDeckId
              ? updateDeckMutation.isPending
              : createDeckMutation.isPending
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
              Tem certeza que deseja deletar este deck? Todos os flashcards serão removidos.
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
                onClick={() => handleDeleteDeck(confirmDeleteId)}
                disabled={deleteDeckMutation.isPending}
              >
                {deleteDeckMutation.isPending ? "Deletando..." : "Deletar"}
              </BaseButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};