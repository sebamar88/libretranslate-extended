export type Provider = "libretranslate" | "ftapi";
export type TranslateOptions = {
    query: string;
    target: string;
    source?: string | null;
    provider?: Provider;
    baseUrl?: string;
};
export type ClientConfig = {
    provider?: Provider;
    baseUrl?: string;
};
//# sourceMappingURL=types.d.ts.map