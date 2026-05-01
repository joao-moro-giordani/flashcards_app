import API_CONFIG from "../config/api"
import type { Flashcard } from "../types"
import type { FlashcardPayload } from "../types/payloadTypes"
import apiClient from "./apiClient"

export const flashcardService = {
  async getFlashcards(): Promise<Flashcard[]> {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.FLASHCARDS)
    return response.data
  },

  async showFlashcard(id: number): Promise<Flashcard> {
    const response = await apiClient.get(
      `${API_CONFIG.ENDPOINTS.FLASHCARDS}/${id}`
    )
    return response.data
  },

  async storeFlashcard(payload: FlashcardPayload): Promise<Flashcard> {
    const response = await apiClient.post(
      API_CONFIG.ENDPOINTS.FLASHCARDS,
      payload
    )
    return response.data
  },

  async updateFlashcard(
    id: number, payload: Partial<FlashcardPayload>): Promise<Flashcard> {
    const response = await apiClient.put(
        `${API_CONFIG.ENDPOINTS.FLASHCARDS}/${id}`, 
        payload
    )
    return response.data
  },

  async deleteFlashcard(id: number): Promise<{ message: string }> {
    const response = await apiClient.delete(
      `${API_CONFIG.ENDPOINTS.FLASHCARDS}/${id}`
    )
    return response.data
  }
}