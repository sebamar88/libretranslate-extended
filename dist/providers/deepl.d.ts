export type DeeplConfig = {
    apiKey: string;
};
type TranslateParams = {
    query: string | string[];
    source?: string;
    target: string;
};
export declare function deeplTranslate({ query, source, target }: TranslateParams, cfg: DeeplConfig): Promise<{
    text: string | string[];
    detectedSourceLang?: string;
}>;
export {};
//# sourceMappingURL=deepl.d.ts.map