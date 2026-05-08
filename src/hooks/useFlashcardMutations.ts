import { useMutation, useQueryClient } from "@tanstack/react-query"
import { flashcardService } from "../services/flashcardService"
import type { FlashcardPayload } from "../types/payloadTypes"

export const useCreateFlashcard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: FlashcardPayload) => flashcardService.storeFlashcard(payload),
    onSuccess: (flashcard) => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] })
      queryClient.invalidateQueries({ queryKey: ["deck-flashcards", flashcard.deckId] })
    },
  })
}

export const useUpdateFlashcard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<FlashcardPayload> }) =>
      flashcardService.updateFlashcard(id, payload),
    onSuccess: (_, { payload }) => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] })
      if (payload?.deckId) {
        queryClient.invalidateQueries({ queryKey: ["deck-flashcards", payload.deckId] })
      }
    },
  })
}

export const useDeleteFlashcard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => flashcardService.deleteFlashcard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] })
      queryClient.invalidateQueries({ queryKey: ["decks"] })
    },
  })
}
