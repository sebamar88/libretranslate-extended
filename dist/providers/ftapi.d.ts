export type FTAPITranslateParams = {
    query: string;
    source?: string | null;
    target: string;
    baseUrl?: string;
};
type FTAPIResponse = {
    ["source-language"]?: string;
    ["source-text"]?: string;
    ["destination-language"]?: string;
    ["destination-text"]?: string;
    pronunciation?: {
        ["source-text-phonetic"]?: string | null;
        ["source-text-audio"]?: string | null;
        ["destination-text-audio"]?: string | null;
    };
    translations?: {
        ["all-translations"]?: any;
        ["possible-translations"]?: string[] | null;
        ["possible-mistakes"]?: string[] | null;
    };
    definitions?: Array<{
        ["part-of-speech"]?: string | null;
        definition?: string | null;
        example?: string | null;
        ["other-examples"]?: string[] | null;
        synonyms?: Record<string, string[]> | null;
    }> | null;
    ["see-also"]?: string[] | null;
};
export declare function ftapiTranslate({ query, source, target, baseUrl, }: FTAPITranslateParams): Promise<{
    text: string;
    detectedSourceLang?: string;
    raw: FTAPIResponse;
}>;
export declare function ftapiListLanguages(baseUrl?: string): Promise<string[]>;
export {};
//# sourceMappingURL=ftapi.d.ts.map