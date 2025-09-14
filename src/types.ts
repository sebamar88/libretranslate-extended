// types.ts
export type Provider = "libretranslate" | "ftapi" | "deepl";

export type ClientConfig = {
    provider?: Provider;
    baseUrl?: string; // para apuntar a tu instancia LT o a un FTAPI propio
    apiKey?: string; // solo LT cuando corresponde
};

export type TranslateOptions = ClientConfig & {
    query: string | string[];
    source?: string; // "auto" | "es" | ...
    target: string; // "en" | "pt" | ...
    format?: "text" | "html"; // LibreTranslate
};
