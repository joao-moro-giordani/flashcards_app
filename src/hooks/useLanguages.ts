import { useQuery } from "@tanstack/react-query"
import { languageService } from "../services/languageService"
import type { Language } from "../types"

export const useLanguages = () => {
  return useQuery<Language[], Error>({
    queryKey: ["languages"],
    queryFn: languageService.getLanguages,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  })
}
