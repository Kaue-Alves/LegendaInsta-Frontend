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
        <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-center gap-3">
                        <Instagram className="w-8 h-8 text-purple-600" />
                        <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            LegendaInsta
                        </h1>
                        <Sparkles className="w-6 h-6 text-pink-500" />
                    </div>
                    <p className="text-center text-gray-600 mt-2">
                        Gere legendas incríveis para suas fotos do Instagram com
                        IA
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Upload & Options */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                1. Faça upload da imagem
                            </h2>
                            <ImageUpload
                                onImageSelect={setSelectedImage}
                                selectedImage={selectedImage}
                            />
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                2. Personalize sua legenda
                            </h2>
                            <CaptionOptions
                                tom={tom}
                                emojis={emojis}
                                prompt={prompt}
                                onTomChange={setTom}
                                onEmojisChange={setEmojis}
                                onPromptChange={setPrompt}
                            />
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={handleGenerate}
                            disabled={!selectedImage || loading}
                            className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
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

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-red-700 text-sm">
                                    ❌ {error}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Results */}
                    <div>
                        {captions.length > 0 ? (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <CaptionResults captions={captions} />

                                <button
                                    onClick={handleReset}
                                    className="w-full mt-6 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Gerar Novas Legendas
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                                <div className="flex flex-col items-center justify-center text-gray-400">
                                    <Sparkles className="w-16 h-16 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-500 mb-2">
                                        Suas legendas aparecerão aqui
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        Faça upload de uma imagem e clique em
                                        "Gerar Legendas"
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">
                        Como funciona? 🤔
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
                        <div>
                            <div className="font-semibold text-purple-600 mb-2">
                                📸 Passo 1
                            </div>
                            <p>Faça upload da sua foto do Instagram</p>
                        </div>
                        <div>
                            <div className="font-semibold text-purple-600 mb-2">
                                ⚙️ Passo 2
                            </div>
                            <p>Escolha o tom e o estilo da legenda</p>
                        </div>
                        <div>
                            <div className="font-semibold text-purple-600 mb-2">
                                ✨ Passo 3
                            </div>
                            <p>
                                Receba 5 legendas criadas por IA e copie sua
                                favorita!
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="text-center py-8 text-gray-500 text-sm">
                <p>Desenvolvido com 💜 usando Google Gemini AI</p>
            </footer>
        </div>
    );
}

export default App;
