// detectLanguage.ts
import {
    libreTranslateDetect,
    libreTranslateTranslate,
} from "./providers/libretranslate";
import { ftapiTranslate } from "./providers/ftapi";
import type { ClientConfig } from "./types";

const DEFAULTS = {
    provider:
        (process.env.LT_PROVIDER as "libretranslate" | "ftapi") ??
        "libretranslate",
    baseUrl: process.env.LT_BASE_URL,
    apiKey: process.env.LT_API_KEY,
};

// ¡SIN recursión!
export async function detectLanguage(
    text: string,
    cfg?: ClientConfig
): Promise<string> {
    const provider = cfg?.provider ?? DEFAULTS.provider;
    const baseUrl = cfg?.baseUrl ?? DEFAULTS.baseUrl;

    if (provider === "ftapi") {
        // FTAPI no documenta endpoint /detect. Como workaround liviano:
        // hacemos una traducción a 'en' SIN 'sl', y NO asumimos que devuelve el source.
        // Si querés realmente el idioma, preferí siempre LibreTranslate /detect. :contentReference[oaicite:6]{index=6}
        await ftapiTranslate({ query: text, target: "en" }, { baseUrl });
        throw new Error(
            "FTAPI: language detection is not supported by the public docs"
        );
    }

    // LibreTranslate: opción A (endpoint dedicado /detect)
    const det = await libreTranslateDetect(text, {
        baseUrl: baseUrl ?? "http://localhost:5000",
        apiKey: DEFAULTS.apiKey,
    });
    return det.language;

    // Opción B (si querés evitar /detect):
    // const t = await libreTranslateTranslate({ query: text, source: "auto", target: "en" }, { baseUrl: baseUrl ?? "http://localhost:5000", apiKey: DEFAULTS.apiKey });
    // const lang = Array.isArray(t.detectedLanguage) ? t.detectedLanguage[0]?.language : t.detectedLanguage?.language;
    // if (!lang) throw new Error("LibreTranslate: could not infer detectedLanguage");
    // return lang;
}
