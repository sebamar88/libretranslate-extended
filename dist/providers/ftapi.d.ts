export type FtapiConfig = {
    baseUrl?: string;
};
type TranslateParams = {
    query: string | string[];
    source?: string;
    target: string;
};
export type FtapiResult = {
    text: string | string[];
    detectedSourceLang?: string;
};
export declare function ftapiTranslate({ query, source, target }: TranslateParams, cfg?: FtapiConfig): Promise<FtapiResult>;
export {};
//# sourceMappingURL=ftapi.d.ts.map