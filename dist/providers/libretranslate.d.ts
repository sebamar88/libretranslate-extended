export type LibreTranslateConfig = {
    baseUrl: string;
    apiKey?: string;
};
type TranslateParams = {
    query: string | string[];
    source?: string;
    target: string;
    format?: "text" | "html";
};
export type TranslateResult = {
    text: string | string[];
    detectedLanguage?: {
        language: string;
        confidence?: number;
    } | Array<{
        language: string;
        confidence?: number;
    }>;
    alternatives?: string[] | string[][];
};
export declare function libreTranslateTranslate({ query, source, target, format }: TranslateParams, cfg: LibreTranslateConfig): Promise<TranslateResult>;
export declare function libreTranslateDetect(text: string, cfg: LibreTranslateConfig): Promise<{
    language: string;
    confidence?: number;
}>;
export {};
