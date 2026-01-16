export type Tom =
    | "tecnico"
    | "divertido"
    | "profissional"
    | "informal"
    | "inspirador"
    | "criativo"
    | "neutro";

export type Emojis = "sem_emoji" | "com_emoji" | "livre";

export interface GenerateCaptionsRequest {
    image: File;
    tom?: Tom;
    emojis?: Emojis;
    prompt?: string;
}

export interface ApiError {
    error?: string;
    statusCode?: number;
    message?: string;
}
