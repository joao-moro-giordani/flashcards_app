import React, { useState, useEffect } from "react";
import BaseInput from "../ui/BaseInput";
import ColorPicker from "../ui/ColorPicker";
import BaseButton from "../ui/BaseButton";
import type { Folder } from "../../types";

type Props = {
  folder?: Folder;
  onSubmit: (data: { name: string; color: string }) => Promise<void>;
  isLoading?: boolean;
};

const FolderForm: React.FC<Props> = ({ folder, onSubmit, isLoading = false }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#3B82F6");
  const [error, setError] = useState("");

  useEffect(() => {
    if (folder) {
      setName(folder.name);
      setColor(folder.color || "#3B82F6");
    }
  }, [folder]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Nome é obrigatório");
      return;
    }

    try {
      await onSubmit({ name: name.trim(), color });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar pasta");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Nome da Pasta
        </label>
        <BaseInput
          placeholder="Ex: Inglês, Espanhol..."
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
          {isLoading ? "Salvando..." : folder ? "Atualizar" : "Criar"}
        </BaseButton>
      </div>
    </form>
  );
};

export default FolderForm;
