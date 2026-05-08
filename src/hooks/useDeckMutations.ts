import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deckService } from "../services/deckService"
import type { DeckPayload } from "../types/payloadTypes"

export const useCreateDeck = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: DeckPayload) => deckService.storeDeck(payload),
    onSuccess: (deck) => {
      queryClient.invalidateQueries({ queryKey: ["decks"] })
      queryClient.invalidateQueries({ queryKey: ["folder", deck.folderId] })
    },
  })
}

export const useUpdateDeck = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<DeckPayload> }) =>
      deckService.updateDeck(id, payload),
    onSuccess: (_, { payload }) => {
      queryClient.invalidateQueries({ queryKey: ["decks"] })
      if (payload?.folderId) {
        queryClient.invalidateQueries({ queryKey: ["folder", payload.folderId] })
      }
    },
  })
}

export const useDeleteDeck = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      deckId,
    }: {
      deckId: number
      folderId: number
    }) => deckService.deleteDeck(deckId),

    onSuccess: (_, { folderId }) => {
      queryClient.invalidateQueries({ queryKey: ["decks"] })
      queryClient.invalidateQueries({ queryKey: ["folders"] })
      queryClient.invalidateQueries({ queryKey: ["folder", folderId] })
    },
  })
}
