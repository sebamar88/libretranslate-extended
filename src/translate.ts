import { ftapiTranslate } from "./providers/ftapi";
import { ClientConfig, TranslateOptions } from "./types";
// import { libreTranslate } from "./providers/libretranslate"; // el tuyo actual

const DEFAULTS = {
    provider:
        (process.env.LT_PROVIDER as "libretranslate" | "ftapi") ??
        "libretranslate",
    baseUrl: process.env.LT_BASE_URL, // opcional, respeta tu semántica actual
};

export async function translate(
    opts: TranslateOptions | string
): Promise<string> {
    const options =
        typeof opts === "string"
            ? { query: opts, target: "en" } // o como lo manejes ahora
            : opts;

    const provider = options.provider ?? DEFAULTS.provider;

    if (provider === "ftapi") {
        const { text } = await ftapiTranslate({
            query: options.query,
            source: options.source,
            target: options.target,
            baseUrl: options.baseUrl ?? DEFAULTS.baseUrl ?? undefined,
        });
        return text;
    }

    return translate({
        query: options.query,
        source: options.source,
        target: options.target,
        baseUrl: options.baseUrl ?? DEFAULTS.baseUrl ?? undefined,
    });
}

export async function detectLanguage(
    text: string,
    cfg?: ClientConfig
): Promise<string> {
    const provider = cfg?.provider ?? DEFAULTS.provider;

    if (provider === "ftapi") {
        // FTAPI no expone /detect; hacemos un translate “barato”
        // truco: traducir a un idioma neutral (ej. "en") y leer source-language
        const { detectedSourceLang } = await ftapiTranslate({
            query: text,
            target: "en",
            baseUrl: cfg?.baseUrl ?? DEFAULTS.baseUrl ?? undefined,
        });
        if (!detectedSourceLang)
            throw new Error("FTAPI: could not detect language");
        return detectedSourceLang;
    }

    return detectLanguage(text, cfg);
}
