import type { Tom, Emojis } from "../types";

interface CaptionOptionsProps {
    tom: Tom;
    emojis: Emojis;
    prompt: string;
    onTomChange: (tom: Tom) => void;
    onEmojisChange: (emojis: Emojis) => void;
    onPromptChange: (prompt: string) => void;
}

const TOM_OPTIONS: { value: Tom; label: string; description: string }[] = [
    { value: "neutro", label: "Neutro", description: "Equilibrado" },
    {
        value: "profissional",
        label: "Profissional",
        description: "Formal e corporativo",
    },
    {
        value: "divertido",
        label: "Divertido",
        description: "Leve e bem-humorado",
    },
    {
        value: "informal",
        label: "Informal",
        description: "Casual e descontraído",
    },
    { value: "inspirador", label: "Inspirador", description: "Motivacional" },
    {
        value: "criativo",
        label: "Criativo",
        description: "Original e artístico",
    },
    { value: "tecnico", label: "Técnico", description: "Informativo" },
];

const EMOJI_OPTIONS: { value: Emojis; label: string; description: string }[] = [
    { value: "livre", label: "Livre", description: "Uso opcional" },
    {
        value: "com_emoji",
        label: "Com Emojis",
        description: "Até 2 por legenda",
    },
    { value: "sem_emoji", label: "Sem Emojis", description: "Apenas texto" },
];

export function CaptionOptions({
    tom,
    emojis,
    prompt,
    onTomChange,
    onEmojisChange,
    onPromptChange,
}: CaptionOptionsProps) {
    return (
        <div className="space-y-5 sm:space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Tom da Legenda
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                    {TOM_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onTomChange(option.value)}
                            className={`p-2.5 sm:p-3 rounded-lg border-2 transition-all duration-300 text-left hover:shadow-md ${
                                tom === option.value
                                    ? "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-md scale-[1.02]"
                                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/30"
                            }`}
                        >
                            <div className="font-medium text-xs sm:text-sm">
                                {option.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                                {option.description}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Uso de Emojis
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {EMOJI_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onEmojisChange(option.value)}
                            className={`p-2.5 sm:p-3 rounded-lg border-2 transition-all duration-300 text-center hover:shadow-md ${
                                emojis === option.value
                                    ? "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-md scale-[1.02]"
                                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/30"
                            }`}
                        >
                            <div className="font-medium text-xs sm:text-sm">
                                {option.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                                {option.description}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label
                    htmlFor="prompt"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Descrição Adicional (Opcional)
                </label>
                <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => onPromptChange(e.target.value)}
                    placeholder="Ex: Foto tirada em uma viagem à praia durante o pôr do sol..."
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-shadow duration-300 hover:shadow-md text-sm sm:text-base"
                    rows={3}
                />
                <p className="mt-2 text-xs text-gray-500">
                    Adicione contexto para gerar legendas mais personalizadas
                </p>
            </div>
        </div>
    );
}
