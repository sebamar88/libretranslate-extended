export type Provider = "libretranslate" | "ftapi";

export type TranslateOptions = {
    query: string;
    target: string;
    source?: string | null;
    // NUEVO:
    provider?: Provider;
    baseUrl?: string; // respeta el existente si ya lo tenías para LibreTranslate
};

export type ClientConfig = {
    provider?: Provider; // default "libretranslate"
    baseUrl?: string; // default según provider
};
