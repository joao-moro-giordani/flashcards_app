import API_CONFIG from "../config/api"
import type { Language } from "../types"
import apiClient from "./apiClient"

export const languageService = {
  async getLanguages(): Promise<Language[]> {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.LANGUAGES)
    return response.data
  },

  async showLanguage(id: number): Promise<Language> {
    const response = await apiClient.get(
      `${API_CONFIG.ENDPOINTS.LANGUAGES}/${id}`
    )
    return response.data
  }
}