import { useQuery } from "@tanstack/react-query"
import { folderService } from "../services/folderService"
import type { Folder } from "../types"

export const useFolders = () => {
  return useQuery<Folder[], Error>({
    queryKey: ["folders"],
    queryFn: folderService.getFolders,
    staleTime: 1000 * 60,
    retry: 1,
  })
}
