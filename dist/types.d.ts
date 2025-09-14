export type Provider = "libretranslate" | "ftapi" | "deepl";
export type ClientConfig = {
    provider?: Provider;
    baseUrl?: string;
    apiKey?: string;
};
export type TranslateOptions = ClientConfig & {
    query: string | string[];
    source?: string;
    target: string;
    format?: "text" | "html";
};
//# sourceMappingURL=types.d.ts.map