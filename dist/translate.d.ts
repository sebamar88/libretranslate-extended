interface TranslateOptions {
    query: string;
    source?: string;
    target: string;
    format?: string;
}
export declare const translate: ({ query, source, target, format, }: TranslateOptions) => Promise<string>;
export declare const detectLanguage: (text: string) => Promise<string>;
export {};
//# sourceMappingURL=translate.d.ts.map