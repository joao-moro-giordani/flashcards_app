export interface Deck {
    id: string
    name: string
    color: string
}

export interface Flashcard {
  id: string
  deckId: number

  rawContent: string
  rawTranslation: string

  normalizedContent?: NormalizedContent
  normalizedTranslation?: NormalizedContent

  contentLangId: number
  translationLangId: number

  type: 'word' | 'sentence'
  gender?: 'masculine' | 'feminine' | 'neutral'

  createdAt: string
  updatedAt: string
}

export interface NormalizedContent {
    tokens: string[]
}