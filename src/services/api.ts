import type { GenerateCaptionsRequest, ApiError } from "../types";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export class ApiService {
    static async generateCaptions(
        request: GenerateCaptionsRequest
    ): Promise<string[]> {
        const formData = new FormData();
        formData.append("image", request.image);

        if (request.tom) {
            formData.append("tom", request.tom);
        }

        if (request.emojis) {
            formData.append("emojis", request.emojis);
        }

        if (request.prompt) {
            formData.append("prompt", request.prompt);
        }

        const response = await fetch(`${API_BASE_URL}/generate`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const error: ApiError = await response.json();

            if (response.status === 400) {
                throw new Error(error.error || "Erro de validação");
            } else if (response.status === 500) {
                throw new Error(
                    "Erro no servidor. Tente novamente mais tarde."
                );
            }

            throw new Error("Erro ao gerar legendas");
        }

        const captions: string[] = await response.json();
        return captions;
    }

    static async healthCheck(): Promise<{ hello: string }> {
        const response = await fetch(`${API_BASE_URL}/`);
        return response.json();
    }
}
