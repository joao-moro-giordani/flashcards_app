import { useInfiniteQuery } from "@tanstack/react-query"
import type { InfiniteData } from "@tanstack/react-query"
import { flashcardService } from "../services/flashcardService"
import type { PaginatedFlashcards } from "../types"

export const useDeckFlashcards = (deckId?: number) => {
  return useInfiniteQuery<
    PaginatedFlashcards,
    Error,
    InfiniteData<PaginatedFlashcards>,
    [string, number | undefined],
    number
  >({
    queryKey: ["deckFlashcards", deckId],
    queryFn: ({ pageParam = 1 }) => {
      if (deckId === undefined) {
        throw new Error("ID inválido")
      }
      return flashcardService.getByDeck(deckId, pageParam, 5)
    },
    enabled: deckId !== undefined,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1
      }
      return undefined
    },
    staleTime: 1000 * 60,
    retry: 1,
  })
}
