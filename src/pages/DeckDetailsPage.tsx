import { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Loader } from '../components/ui/Loader'
import { FlashcardComponent } from '../components/ui/FlashcardComponent'
import PageHeader from '../components/layout/PageHeader'
import BaseButton from '../components/ui/BaseButton'
import Modal from '../components/ui/Modal'
import DeckWithFlashcardsForm from '../components/deck/DeckWithFlashcardsForm'
import { Layers, ChevronLeft, ChevronRight, MoreVertical, Pencil, Trash } from 'lucide-react'
import { useDeck } from '../hooks/useDeck'
import { useDeckFlashcards } from '../hooks/useDeckFlashcards'
import { useLanguages } from '../hooks/useLanguages'
import { useDeleteDeck } from '../hooks/useDeckMutations'
import { useCreateOrUpdateDeckWithFlashcards } from '../hooks/useDeckWithFlashcardsMutations'
import Dropdown from '../components/ui/Dropdown'
import type { Flashcard } from '../types'

export const DeckDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const deckId = Number(id)
  const hasValidId = Number.isFinite(deckId) && deckId > 0

  const {
    data: deck,
    isLoading: isDeckLoading,
    isError: isDeckError,
    error: deckError,
  } = useDeck(hasValidId ? deckId : undefined)

  const {
    data: flashcardPages,
    isLoading: isFlashcardsLoading,
    isError: isFlashcardsError,
    error: flashcardsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDeckFlashcards(hasValidId ? deckId : undefined)

  const { data: languages = [] } = useLanguages()

  const deleteDeckMutation = useDeleteDeck()
  const updateDeckWithFlashcardsMutation = useCreateOrUpdateDeckWithFlashcards()

const flashcards = useMemo<Flashcard[]>(
  () => flashcardPages?.pages.flatMap((page) => page.data) ?? [],
  [flashcardPages],
)

const totalFlashcards =
  flashcardPages?.pages?.[0]?.meta?.total ?? 0

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : flashcards.length - 1
    )
  }

const goToNext = async () => {
  const isLastCard = currentIndex === flashcards.length - 1

  if (isLastCard) {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage()

      setCurrentIndex((prev) => prev + 1)
      return
    }

    setCurrentIndex(0)
    return
  }

  setCurrentIndex((prev) => prev + 1)
}

  const handleUpdateDeckWithFlashcards = async (data: {
    name: string
    color: string
    folderId: number
    flashcards: any[]
    deletedFlashcards: number[]
  }) => {
    await updateDeckWithFlashcardsMutation.mutateAsync({
      deckId,
      deck: {
        name: data.name,
        color: data.color,
        folderId: data.folderId,
      },
      flashcards: data.flashcards,
      deletedFlashcards: data.deletedFlashcards,
    })
    setIsEditModalOpen(false)
  }

  const handleDeleteDeck = async () => {
    if (!deck) return
    await deleteDeckMutation.mutateAsync({
      deckId,
      folderId: deck.folderId,
    })
    const folderRoute = deck?.folderId ? `/folders/${deck.folderId}` : '/folders'
    navigate(folderRoute)
  }

  if (!hasValidId) {
    return (
      <div className="p-6 bg-black min-h-screen">
        <p className="text-red-400 text-sm">ID inválido</p>
      </div>
    )
  }

  if (isDeckLoading || isFlashcardsLoading) {
    return <Loader fullScreen />
  }

  if (isDeckError || isFlashcardsError || !deck) {
    return (
      <div className="p-6 bg-black min-h-screen">
        <p className="text-red-400 text-sm">
          {deckError?.message || flashcardsError?.message || 'Erro ao carregar deck'}
        </p>
      </div>
    )
  }

  const deckFolderId =
    deck.folderId ?? (deck as { folder_id?: number }).folder_id
  const folderRoute =
    Number.isFinite(deckFolderId) && deckFolderId > 0
      ? `/folders/${deckFolderId}`
      : `/folders`

  return (
    <div className="p-6 bg-black min-h-screen">
      <PageHeader
        backTo={folderRoute}
        titleNode={
          <div className="flex items-center gap-2">
            <Layers size={22} style={{ color: deck.color }} />
            <div className="leading-tight">
              <h1 className="text-lg font-semibold text-white">
                {deck.name}
              </h1>
              <p className="text-gray-400 text-xs">
                {totalFlashcards} flashcards
              </p>
            </div>
          </div>
        }
        actions={
          <div className="flex items-center gap-2">
            <BaseButton variant="ghost" onClick={() => setIsEditModalOpen(true)}>
              <Pencil size={16} />
            </BaseButton>
            <div className="relative">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition"
              >
                <MoreVertical size={18} />
              </button>
              <Dropdown isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
                <button
                  onClick={() => {
                    setConfirmDeleteOpen(true)
                    setMenuOpen(false)
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-gray-800"
                >
                  <Trash size={14} />
                  Deletar Deck
                </button>
              </Dropdown>
            </div>
          </div>
        }
      />

      {flashcards.length === 0 ? (
        <p className="text-gray-400 text-sm mt-6">
          Nenhum flashcard neste deck
        </p>
      ) : (
        <div className="mt-6 bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={goToPrev}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
              disabled={flashcards.length <= 1}
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex-1 max-w-md">
              <FlashcardComponent
                front={flashcards[currentIndex].rawContent}
                back={flashcards[currentIndex].rawTranslation}
              />
            </div>

            <button
              onClick={goToNext}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
              disabled={flashcards.length <= 1}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="text-center mt-4 text-gray-400 text-sm">
            {currentIndex + 1} / {totalFlashcards}
          </div>
        </div>
      )}

      {/* Modal de Editar Deck com Flashcards */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Deck e Flashcards"
        size="lg"
      >
        <DeckWithFlashcardsForm
          deck={deck}
          folderId={deckFolderId}
          languages={languages}
          flashcards={flashcards}
          onSubmit={handleUpdateDeckWithFlashcards}
          isLoading={updateDeckWithFlashcardsMutation.isPending}
        />
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      {confirmDeleteOpen && (
        <Modal
          isOpen={true}
          onClose={() => setConfirmDeleteOpen(false)}
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
                onClick={() => setConfirmDeleteOpen(false)}
              >
                Cancelar
              </BaseButton>
              <BaseButton
                variant="danger"
                onClick={handleDeleteDeck}
                disabled={deleteDeckMutation.isPending}
              >
                {deleteDeckMutation.isPending ? "Deletando..." : "Deletar"}
              </BaseButton>
            </div>
          </div>
        </Modal>
      )}

      {/* Space for future buttons */}
      <div className="mt-6">
        {/* Future buttons like "Practice Deck" will go here */}
      </div>
    </div>
  )
}
