export interface Folder {
    id: number
    name: string
    color: string

    decks?: Deck[]

    deletedAt: string | null
    createdAt: string
    updatedAt: string
}

export interface Deck {
    id: number
    folderId: number

    name: string
    color: string

    deletedAt: string | null
    createdAt: string
    updatedAt: string
}

export interface Flashcard {
  id: number
  deckId: number

  rawContent: string
  rawTranslation: string

//   normalizedContent?: NormalizedContent
//   normalizedTranslation?: NormalizedContent

  contentLangId: number
  translationLangId: number

//   type: 'word' | 'sentence'
//   gender?: 'masculine' | 'feminine' | 'neutral'

  deletedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface PaginatedFlashcards {
  data: Flashcard[]
  current_page: number
  last_page: number
}

export interface Language {
  id: number
  name: string
  code: string
}

// export interface NormalizedContent {
//     tokens: string[]
// }