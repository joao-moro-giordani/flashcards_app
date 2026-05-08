import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deckService } from "../services/deckService"
import { flashcardService } from "../services/flashcardService"
import type { DeckPayload } from "../types/payloadTypes"
import type { Flashcard } from "../types"

interface DeckWithFlashcardsPayload {
  deck: DeckPayload;
  flashcards: Array<Omit<Flashcard, "id" | "deletedAt" | "createdAt" | "updatedAt"> & { id?: number }>;
  deletedFlashcards: number[];
}

export const useCreateOrUpdateDeckWithFlashcards = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: DeckWithFlashcardsPayload & { deckId?: number }) => {
      const { deck, flashcards, deletedFlashcards, deckId } = payload

      // Create or update deck
      let savedDeck
      if (deckId) {
        savedDeck = await deckService.updateDeck(deckId, deck)
        console.log(savedDeck)
      } else {
        savedDeck = await deckService.storeDeck(deck)
      }

      // Delete flashcards
      for (const flashcardId of deletedFlashcards) {
        try {
          await flashcardService.deleteFlashcard(flashcardId)
        } catch (err) {
          console.error("Erro ao deletar flashcard:", err)
        }
      }

      // Create or update flashcards
      for (const flashcard of flashcards) {
        try {
          if (flashcard.id) {
            await flashcardService.updateFlashcard(flashcard.id, {
              ...flashcard,
              deckId: savedDeck.id,
            })
          } else {
            await flashcardService.storeFlashcard({
              ...flashcard,
              deckId: savedDeck.id,
            } as any)
          }
        } catch (err) {
          console.error("Erro ao salvar flashcard:", err)
        }
      }

      return savedDeck
    },
    onSuccess: (deck) => {
      queryClient.invalidateQueries({ queryKey: ["decks"] })
      queryClient.invalidateQueries({ queryKey: ["deck", deck.id] })
      queryClient.invalidateQueries({ queryKey: ["deck-flashcards", deck.id] })
      queryClient.invalidateQueries({ queryKey: ["folder", deck.folderId] })
    },
  })
}