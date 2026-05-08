import React, { useState, useEffect } from "react";
import BaseInput from "../ui/BaseInput";
import BaseButton from "../ui/BaseButton";
import ColorPicker from "../ui/ColorPicker";
import type { Deck } from "../../types";

type Props = {
  deck?: Deck;
  folderId: number;
  onSubmit: (data: { name: string; color: string; folderId: number }) => Promise<void>;
  isLoading?: boolean;
};

const DeckForm: React.FC<Props> = ({
  deck,
  folderId,
  onSubmit,
  isLoading = false,
}) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#3B82F6");
  const [error, setError] = useState("");

  useEffect(() => {
    if (deck) {
      setName(deck.name);
      setColor(deck.color || "#3B82F6");
    }
  }, [deck]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Nome é obrigatório");
      return;
    }

    try {
      await onSubmit({
        name: name.trim(),
        color,
        folderId,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar deck");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

      {error && (
        <p className="text-red-400 text-sm mb-4">{error}</p>
      )}

      <div className="flex gap-2 justify-end">
        <BaseButton
          variant="ghost"
          onClick={() => setName("")}
          type="button"
        >
          Limpar
        </BaseButton>
        <BaseButton type="submit" disabled={isLoading}>
          {isLoading ? "Salvando..." : deck ? "Atualizar" : "Criar"}
        </BaseButton>
      </div>
    </form>
  );
};

export default DeckForm;
