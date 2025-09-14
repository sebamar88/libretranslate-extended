// providers/deepl.ts
import * as deepl from "deepl-node";
import { SourceLanguageCode, TargetLanguageCode } from "deepl-node";

export type DeeplConfig = { apiKey: string };

function normalizeSource(source?: string): SourceLanguageCode | null {
    if (!source || source.toLowerCase() === "auto") {
        return null;
    }

    const map: Record<string, SourceLanguageCode> = {
        en: "en",
        es: "es",
        pt: "pt",
        nl: "nl",
    };

    const code = map[source.toLowerCase()];
    return (code ?? source.toUpperCase()) as SourceLanguageCode;
}

function normalizeTarget(target: string): TargetLanguageCode {
    const map: Record<string, TargetLanguageCode> = {
        en: "en-US",
        es: "es",
        pt: "pt-BR",
        nl: "nl",
    };

    const code = map[target.toLowerCase()];
    return (code ?? target.toUpperCase()) as TargetLanguageCode;
}

type TranslateParams = {
    query: string | string[];
    source?: string;
    target: string;
};

export async function deeplTranslate(
    { query, source, target }: TranslateParams,
    cfg: DeeplConfig
): Promise<{ text: string | string[]; detectedSourceLang?: string }> {
    const translator = new deepl.Translator(cfg.apiKey);

    const result = await translator.translateText(
        query,
        normalizeSource(source),
        normalizeTarget(target)
    );

    if (Array.isArray(result)) {
        return {
            text: result.map((r) => r.text),
            detectedSourceLang: result[0]?.detectedSourceLang,
        };
    }

    return {
        text: result.text,
        detectedSourceLang: result.detectedSourceLang,
    };
}
