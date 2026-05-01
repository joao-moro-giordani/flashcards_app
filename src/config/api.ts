const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_APP_API_BASE_URL,
    TIMEOUT: Number(import.meta.env.VITE_APP_API_TIMEOUT) || 30000,

    ENDPOINTS: {
        LANGUAGES: '/languages',
        DECKS: '/decks',
        FLASHCARDS: '/flashcards'
    }
}

export default API_CONFIG