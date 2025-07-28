interface TranslateOptions {
    query: string;
    source?: string;
    target: string;
    format?: string;
}
interface Language {
    code: string;
    name: string;
}
export declare const translate: ({ query, source, target, format, }: TranslateOptions) => Promise<any>;
export declare const detectLanguage: (text: string) => Promise<any>;
export declare const getLanguages: () => Promise<Language[]>;
export declare const findLanguage: (input: string) => Promise<Language>;
export declare const getLanguageFlag: (code: string) => string;
export declare const getLanguagesWithFlags: () => Promise<{
    flag: string;
    code: string;
    name: string;
}[]>;
export {};
//# sourceMappingURL=translate.d.ts.map