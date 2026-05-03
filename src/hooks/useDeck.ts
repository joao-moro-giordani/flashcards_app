import { useQuery } from "@tanstack/react-query"
import { deckService } from "../services/deckService"
import type { Deck } from "../types"

export const useDeck = (deckId?: number) => {
  return useQuery<Deck, Error>({
    queryKey: ["deck", deckId],
    queryFn: async () => {
      if (deckId === undefined) {
        throw new Error("ID inválido")
      }
      return deckService.showDeck(deckId)
    },
    enabled: deckId !== undefined,
    staleTime: 1000 * 60,
    retry: 1,
  })
}
