import { Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { Deck, Flashcard, Language } from "../../types";
import BaseButton from "../ui/BaseButton";
import BaseInput from "../ui/BaseInput";
import ColorPicker from "../ui/ColorPicker";

type FlashcardFormData = Omit<Flashcard, "id" | "deckId" | "deletedAt" | "createdAt" | "updatedAt"> & {
    tempId?: string;
};

type Props = {
    deck?: Deck;
    folderId: number;
    languages: Language[];
    flashcards?: Flashcard[];
    onSubmit: (data: {
        name: string;
        color: string;
        folderId: number;
        flashcards: (Omit<Flashcard, "id" | "deletedAt" | "createdAt" | "updatedAt"> & { id?: number })[];
        deletedFlashcards: number[];
    }) => Promise<void>;
    isLoading?: boolean;
};

const DeckWithFlashcardsForm: React.FC<Props> = ({
    deck,
    folderId,
    languages,
    flashcards: initialFlashcards,
    onSubmit,
    isLoading = false,
}) => {
    const [name, setName] = useState("");
    const [color, setColor] = useState("#3B82F6");
    const [flashcards, setFlashcards] = useState<(FlashcardFormData & { id?: number })[]>([]);
    const [deletedFlashcards, setDeletedFlashcards] = useState<number[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (deck) {
            setName(deck.name);
            setColor(deck.color || "#3B82F6");
        }
        if (initialFlashcards) {
            setFlashcards(
                initialFlashcards.map((f) => ({
                    id: f.id,
                    rawContent: f.rawContent,
                    rawTranslation: f.rawTranslation,
                    contentLangId: f.contentLangId,
                    translationLangId: f.translationLangId,
                }))
            );
        }
    }, [deck, initialFlashcards]);

    const addFlashcard = () => {
        const tempId = `temp-${Date.now()}`;
        setFlashcards((prev) => [
            ...prev,
            {
                tempId,
                rawContent: "",
                rawTranslation: "",
                contentLangId: languages[0]?.id || 1,
                translationLangId: languages[1]?.id || 2,
            },
        ]);
    };

    const removeFlashcard = (index: number) => {
        const flashcard = flashcards[index];
        if (flashcard.id) {
            setDeletedFlashcards((prev) => [...prev, flashcard.id!]);
        }
        setFlashcards((prev) => prev.filter((_, i) => i !== index));
    };

    const updateFlashcard = (
        index: number,
        field: keyof FlashcardFormData,
        value: any
    ) => {
        setFlashcards((prev) =>
            prev.map((f, i) =>
                i === index ? { ...f, [field]: value } : f
            )
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name.trim()) {
            setError("Nome do deck é obrigatório");
            return;
        }

        if (flashcards.length === 0) {
            setError("Adicione pelo menos um flashcard");
            return;
        }

        const allValid = flashcards.every((f) => f.rawContent.trim() && f.rawTranslation.trim());
        if (!allValid) {
            setError("Todos os flashcards precisam de conteúdo e tradução");
            return;
        }

        try {
            await onSubmit({
                name: name.trim(),
                color,
                folderId,
                flashcards: flashcards.map((f) => ({
                    id: f.id,
                    rawContent: f.rawContent.trim(),
                    rawTranslation: f.rawTranslation.trim(),
                    contentLangId: f.contentLangId,
                    translationLangId: f.translationLangId,
                    deckId: deck?.id || 0,
                })),
                deletedFlashcards,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao salvar deck com flashcards");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Deck Info */}
            <div className="mb-6 pb-6 border-b border-gray-700">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nome do Deck
                    </label>
                    <BaseInput
                        placeholder="Ex: Present Tense, Numbers..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <ColorPicker value={color} onChange={setColor} label="Cor" />
            </div>

            {/* Flashcards */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Flashcards</h3>
                    <BaseButton
                        variant="ghost"
                        onClick={addFlashcard}
                        type="button"
                        className="flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Adicionar Flashcard
                    </BaseButton>
                </div>

                {flashcards.length === 0 ? (
                    <p className="text-gray-400 text-sm">
                        Nenhum flashcard adicionado ainda
                    </p>
                ) : (
                    <div className="space-y-4">
                        {flashcards.map((flashcard, index) => (
                            <div
                                key={flashcard.tempId || flashcard.id}
                                className="p-4 border border-gray-700 rounded-lg bg-gray-800"
                            >
                                {/* Content */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="min-w-0">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Conteúdo
                                        </label>
                                        <BaseInput
                                            placeholder="Ex: Hello"
                                            value={flashcard.rawContent}
                                            onChange={(e) =>
                                                updateFlashcard(index, "rawContent", e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Tradução
                                        </label>
                                        <BaseInput
                                            placeholder="Ex: Olá"
                                            value={flashcard.rawTranslation}
                                            onChange={(e) =>
                                                updateFlashcard(index, "rawTranslation", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Languages */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Idioma do Conteúdo
                                        </label>
                                        <select
                                            value={flashcard.contentLangId}
                                            onChange={(e) =>
                                                updateFlashcard(
                                                    index,
                                                    "contentLangId",
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="
                        w-full px-4 py-2 rounded-lg
                        bg-gray-900 border border-gray-700
                        text-white
                        focus:outline-none focus:ring-2 focus:ring-blue-600
                      "
                                        >
                                            {languages.map((lang) => (
                                                <option key={lang.id} value={lang.id}>
                                                    {lang.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Idioma da Tradução
                                        </label>
                                        <select
                                            value={flashcard.translationLangId}
                                            onChange={(e) =>
                                                updateFlashcard(
                                                    index,
                                                    "translationLangId",
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="
                        w-full px-4 py-2 rounded-lg
                        bg-gray-900 border border-gray-700
                        text-white
                        focus:outline-none focus:ring-2 focus:ring-blue-600
                      "
                                        >
                                            {languages.map((lang) => (
                                                <option key={lang.id} value={lang.id}>
                                                    {lang.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Delete Button */}
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => removeFlashcard(index)}
                                        type="button"
                                        className="
                      flex items-center gap-2 px-3 py-2
                      text-red-400 hover:text-red-300
                      text-sm transition
                    "
                                    >
                                        <Trash size={16} />
                                        Remover
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {error && (
                <p className="text-red-400 text-sm mb-4">{error}</p>
            )}

            <div className="flex gap-2 justify-end">
                <BaseButton variant="ghost" type="button" onClick={() => {
                    if(!deck)
                      window.location.href = `/folders/${folderId}`;
                    else
                      window.location.href = `/decks/${deck.id}`;
                }}>
                    Cancelar
                </BaseButton>
                <BaseButton type="submit" disabled={isLoading}>
                    {isLoading ? "Salvando..." : deck ? "Atualizar Deck" : "Criar Deck"}
                </BaseButton>
            </div>
        </form>
    );
};

export default DeckWithFlashcardsForm;
