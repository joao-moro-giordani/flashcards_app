export interface Folder {
    id: number
    name: string
    color: string

    decks?: Deck[]

    deleted_at: string | null
    created_at: string
    updated_at: string
}

export interface Deck {
    id: number
    folderId: number

    name: string
    color: string

    deleted_at: string | null
    created_at: string
    updated_at: string
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

  deleted_at: string | null
  created_at: string
  updated_at: string
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