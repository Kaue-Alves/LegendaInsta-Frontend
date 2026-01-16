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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Legendas Geradas 🎉
            </h2>

            <div className="space-y-3">
                {captions.map((caption, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="text-sm font-semibold text-purple-600 mb-2">
                                    Opção {index + 1}
                                </div>
                                <p className="text-gray-700 whitespace-pre-wrap">
                                    {caption}
                                </p>
                            </div>

                            <button
                                onClick={() => handleCopy(caption, index)}
                                className="shrink-0 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                title="Copiar legenda"
                            >
                                {copiedIndex === index ? (
                                    <Check className="w-5 h-5 text-green-500" />
                                ) : (
                                    <Copy className="w-5 h-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <p className="text-sm text-blue-800">
                    💡 <strong>Dica:</strong> Clique no ícone de copiar para
                    usar a legenda no Instagram!
                </p>
            </div>
        </div>
    );
}
