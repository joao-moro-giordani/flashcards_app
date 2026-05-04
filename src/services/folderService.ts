import API_CONFIG from "../config/api"
import type { Folder } from "../types"
import type { FolderPayload } from "../types/payloadTypes"
import apiClient from "./apiClient"

export const folderService = {
  async getFolders(): Promise<Folder[]> {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.FOLDERS)
    return response.data.data
  },

  async showFolder(id: number): Promise<Folder> {
    const response = await apiClient.get(
      `${API_CONFIG.ENDPOINTS.FOLDERS}/${id}`
    )
    return response.data.data
  },

  async storeFolder(payload: FolderPayload): Promise<Folder> {
    const response = await apiClient.post(
      API_CONFIG.ENDPOINTS.FOLDERS,
      payload
    )
    return response.data
  },

  async updateFolder(
    id: number, payload: Partial<FolderPayload>): Promise<Folder> {
    const response = await apiClient.put(
        `${API_CONFIG.ENDPOINTS.FOLDERS}/${id}`, 
        payload
    )
    return response.data
  },

  async deleteFolder(id: number): Promise<{ message: string }> {
    const response = await apiClient.delete(
      `${API_CONFIG.ENDPOINTS.FOLDERS}/${id}`
    )
    return response.data
  }
}