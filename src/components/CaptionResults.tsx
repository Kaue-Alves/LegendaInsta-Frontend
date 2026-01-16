import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CaptionResultsProps {
    captions: string[];
}

export function CaptionResults({ captions }: CaptionResultsProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = async (caption: string, index: number) => {
        try {
            await navigator.clipboard.writeText(caption);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error("Erro ao copiar:", err);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Legendas Geradas
                </h2>
                <span className="text-2xl">🎉</span>
            </div>

            <div className="space-y-3">
                {captions.map((caption, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] animate-fadeIn"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex items-start justify-between gap-3 sm:gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                                        {index + 1}
                                    </div>
                                    <span className="text-xs sm:text-sm font-semibold text-purple-600">
                                        Opção {index + 1}
                                    </span>
                                </div>
                                <p className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap break-words">
                                    {caption}
                                </p>
                            </div>

                            <button
                                onClick={() => handleCopy(caption, index)}
                                className="shrink-0 p-2 rounded-lg hover:bg-purple-100 transition-all duration-300 hover:scale-110 active:scale-95 group"
                                title="Copiar legenda"
                            >
                                {copiedIndex === index ? (
                                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 animate-bounce" />
                                ) : (
                                    <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-purple-600 transition-colors" />
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-purple-500 rounded-lg p-3 sm:p-4 mt-6">
                <p className="text-xs sm:text-sm text-gray-700">
                    <span className="text-lg sm:text-xl">💡</span> <strong>Dica:</strong> Clique no ícone de copiar para
                    usar a legenda no Instagram!
                </p>
            </div>
        </div>
    );
}
