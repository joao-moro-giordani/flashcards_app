import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../components/ui/Loader'
import { FlashcardComponent } from '../components/ui/FlashcardComponent'
import PageHeader from '../components/layout/PageHeader'
import BaseButton from '../components/ui/BaseButton'
import { Layers, ChevronLeft, ChevronRight } from 'lucide-react'
import { useDeck } from '../hooks/useDeck'
import { useDeckFlashcards } from '../hooks/useDeckFlashcards'
import type { Flashcard } from '../types'

export const DeckDetailsPage = () => {
  const { id } = useParams()
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

  const flashcards = useMemo<Flashcard[]>(
    () => flashcardPages?.pages.flatMap((page) => page.data) ?? [],
    [flashcardPages],
  )

  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : flashcards.length - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) => {
      if (prev < flashcards.length - 1) {
        return prev + 1
      } else {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
        return 0
      }
    })
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
                {flashcards.length} flashcards
              </p>
            </div>
          </div>
        }
        actions={
          <BaseButton onClick={() => {}}>
            Adicionar Flashcard
          </BaseButton>
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
            {currentIndex + 1} / {flashcards.length}
          </div>
        </div>
      )}

      {/* Space for future buttons */}
      <div className="mt-6">
        {/* Future buttons like "Practice Deck" will go here */}
      </div>
    </div>
  )
}
