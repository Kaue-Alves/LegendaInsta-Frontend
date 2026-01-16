import { useState } from "react";
import { Sparkles, Loader2, Instagram } from "lucide-react";
import { ImageUpload } from "./components/ImageUpload";
import { CaptionOptions } from "./components/CaptionOptions";
import { CaptionResults } from "./components/CaptionResults";
import { ApiService } from "./services/api";
import type { Tom, Emojis } from "./types";

function App() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [tom, setTom] = useState<Tom>("neutro");
    const [emojis, setEmojis] = useState<Emojis>("livre");
    const [prompt, setPrompt] = useState("");
    const [captions, setCaptions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!selectedImage) {
            setError("Por favor, selecione uma imagem");
            return;
        }

        setLoading(true);
        setError(null);
        setCaptions([]);

        try {
            const result = await ApiService.generateCaptions({
                image: selectedImage,
                tom,
                emojis,
                prompt: prompt.trim() || undefined,
            });

            setCaptions(result);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Erro ao gerar legendas"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSelectedImage(null);
        setCaptions([]);
        setError(null);
        setTom("neutro");
        setEmojis("livre");
        setPrompt("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
            <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <Instagram className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 animate-pulse" />
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            LegendaInsta
                        </h1>
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
                    </div>
                    <p className="text-center text-gray-600 mt-2 text-sm sm:text-base px-4">
                        Gere legendas incríveis para suas fotos do Instagram com
                        IA
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                    <div className="space-y-4 sm:space-y-6">
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
                                    1
                                </div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                                    Faça upload da imagem
                                </h2>
                            </div>
                            <ImageUpload
                                onImageSelect={setSelectedImage}
                                selectedImage={selectedImage}
                            />
                        </div>

                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
                                    2
                                </div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                                    Personalize sua legenda
                                </h2>
                            </div>
                            <CaptionOptions
                                tom={tom}
                                emojis={emojis}
                                prompt={prompt}
                                onTomChange={setTom}
                                onEmojisChange={setEmojis}
                                onPromptChange={setPrompt}
                            />
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={!selectedImage || loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Gerando legendas...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Gerar Legendas com IA
                                </>
                            )}
                        </button>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 animate-shake">
                                <p className="text-red-700 text-sm">
                                    {error}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="lg:sticky lg:top-24 lg:self-start">
                        {captions.length > 0 ? (
                            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 animate-fadeIn">
                                <CaptionResults captions={captions} />

                                <button
                                    onClick={handleReset}
                                    className="w-full mt-6 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                                >
                                    Gerar Novas Legendas
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-8 sm:p-12 text-center">
                                <div className="flex flex-col items-center justify-center text-gray-400">
                                    <div className="relative">
                                        <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 mb-4 animate-pulse" />
                                        <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 mb-4 animate-ping opacity-20">
                                            <Sparkles className="w-full h-full" />
                                        </div>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">
                                        Suas legendas aparecerão aqui
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-400 px-4">
                                        Faça upload de uma imagem e clique em
                                        "Gerar Legendas"
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 sm:mt-12 bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 text-center sm:text-left">
                        Como funciona?
                    </h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-sm text-gray-600">
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl hover:shadow-md transition-shadow duration-300">
                            <div className="font-semibold text-purple-600 mb-2 flex items-center gap-2">
                                <span className="text-2xl">📸</span>
                                <span>Passo 1</span>
                            </div>
                            <p>Faça upload da sua foto do Instagram</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl hover:shadow-md transition-shadow duration-300">
                            <div className="font-semibold text-purple-600 mb-2 flex items-center gap-2">
                                <span className="text-2xl">⚙️</span>
                                <span>Passo 2</span>
                            </div>
                            <p>Escolha o tom e o estilo da legenda</p>
                        </div>
                        <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-4 rounded-xl hover:shadow-md transition-shadow duration-300 sm:col-span-2 md:col-span-1">
                            <div className="font-semibold text-purple-600 mb-2 flex items-center gap-2">
                                <span className="text-2xl">✨</span>
                                <span>Passo 3</span>
                            </div>
                            <p>
                                Receba 5 legendas criadas por IA e copie sua
                                favorita!
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="text-center py-6 sm:py-8 text-gray-500 text-xs sm:text-sm px-4">
                <p>Desenvolvido com 💜 usando Google Gemini AI</p>
            </footer>
        </div>
    );
}

export default App;
