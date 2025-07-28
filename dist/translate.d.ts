interface TranslateOptions {
    query: string;
    source?: string;
    target: string;
    format?: string;
}
export declare const translate: ({ query, source, target, format, }: TranslateOptions) => Promise<any>;
export declare const detectLanguage: (text: string) => Promise<any>;
export {};
//# sourceMappingURL=translate.d.ts.map