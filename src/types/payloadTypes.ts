export type FolderPayload = {
    name: string
    color: string
}

export type DeckPayload = {
    name: string
    color: string
    folderId: number
}

export type FlashcardPayload = {
    deckId: number
    rawContent: string
    rawTranslation: string
    contentLangId: number
    translationLangId: number
}