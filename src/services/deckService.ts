import API_CONFIG from "../config/api"
import type { Deck } from "../types"
import type { DeckPayload } from "../types/payloadTypes"
import apiClient from "./apiClient"

export const deckService = {

    async getDecks(): Promise<Deck[]> {
        const response = await apiClient.get(API_CONFIG.ENDPOINTS.DECKS)
        return response.data
    },

    async showDeck(id: number): Promise<Deck> {
        const response = await apiClient.get(
            `${API_CONFIG.ENDPOINTS.DECKS}/${id}`
        )
        return response.data
    },

    async storeDeck(payload: DeckPayload): Promise<Deck> {
        const response = await apiClient.post(
            API_CONFIG.ENDPOINTS.DECKS, payload
        )
        return response.data
    },

    async updateDeck(id: number, payload: Partial<DeckPayload>): Promise<Deck> {
        const response = await apiClient.put(
            `${API_CONFIG.ENDPOINTS.DECKS}/${id}`, 
            payload
        )
        return response.data
    },

    async deleteDeck(id: number): Promise<{ message: string }> {
        const response = await apiClient.delete(
            `${API_CONFIG.ENDPOINTS.DECKS}/${id}`
        )
        return response.data
    }
}