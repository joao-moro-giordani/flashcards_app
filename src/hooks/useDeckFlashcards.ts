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
    queryKey: ["deck-flashcards", deckId],
    queryFn: ({ pageParam = 1 }) => {
      if (deckId === undefined) {
        throw new Error("ID inválido")
      }
      return flashcardService.getByDeck(deckId, pageParam, 5)
    },
    enabled: deckId !== undefined,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.meta.current_page
      const lastPageNumber = lastPage.meta.last_page

      return currentPage < lastPageNumber
        ? currentPage + 1
        : undefined
},
    staleTime: 1000 * 60,
    retry: 1,
  })
}
