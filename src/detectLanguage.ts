// detectLanguage.ts
import { DEFAULTS } from "./contants";
import { deeplTranslate } from "./providers/deepl";
import { ftapiTranslate } from "./providers/ftapi";
import {
    libreTranslateDetect,
    libreTranslateTranslate,
} from "./providers/libretranslate";
import type { ClientConfig } from "./types";

export async function detectLanguage(
    text: string,
    cfg?: ClientConfig
): Promise<string> {
    const provider = cfg?.provider ?? DEFAULTS.provider;

    if (provider === "ftapi") {
        // Truco FTAPI: /translate sin 'sl' => autodetecta; leemos "source-language"
        const { detectedSourceLang } = await ftapiTranslate(
            { query: text, target: "en" },
            { baseUrl: cfg?.baseUrl ?? DEFAULTS.baseUrl }
        );
        if (!detectedSourceLang)
            throw new Error("FTAPI: could not detect language");
        return detectedSourceLang;
    }

    if (provider === "deepl") {
        const { detectedSourceLang } = await deeplTranslate(
            { query: text, target: "EN" },
            { apiKey: cfg?.apiKey ?? process.env.DEEPL_API_KEY! }
        );
        if (!detectedSourceLang) throw new Error("DeepL: detection failed");
        return detectedSourceLang.toLowerCase();
    }

    // LibreTranslate: primero /detect; si falla, fallback a /translate con source:"auto"
    const baseUrl = cfg?.baseUrl ?? DEFAULTS.baseUrl ?? "http://localhost:5000";
    try {
        const det = await libreTranslateDetect(text, {
            baseUrl,
            apiKey: cfg?.apiKey ?? DEFAULTS.apiKey,
        });
        return det.language;
    } catch {
        const t = await libreTranslateTranslate(
            { query: text, source: "auto", target: "en" },
            { baseUrl, apiKey: cfg?.apiKey ?? DEFAULTS.apiKey }
        );
        const lang = Array.isArray(t.detectedLanguage)
            ? t.detectedLanguage[0]?.language
            : t.detectedLanguage?.language;
        if (!lang)
            throw new Error(
                "LibreTranslate: detection failed via /translate fallback"
            );
        return lang;
    }
}
