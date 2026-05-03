import { useQuery } from "@tanstack/react-query"
import { folderService } from "../services/folderService"
import type { Folder } from "../types"

export const useFolder = (folderId?: number) => {
  return useQuery<Folder, Error>({
    queryKey: ["folder", folderId],
    queryFn: async () => {
      if (folderId === undefined) {
        throw new Error("ID inválido")
      }
      return folderService.showFolder(folderId)
    },
    enabled: folderId !== undefined,
    staleTime: 1000 * 60,
    retry: 1,
  })
}
