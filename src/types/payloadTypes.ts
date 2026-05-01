export type DeckPayload = {
    name: string
    color: string
}

export type FlashcardPayload = {
    deckId: number
    rawContent: string
    rawTranslation: string
    contentLangId: number
    translationLangId: number
}