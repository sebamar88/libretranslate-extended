// translate.ts
import { ftapiTranslate } from "./providers/ftapi";
import { libreTranslateTranslate } from "./providers/libretranslate";
import type { ClientConfig, TranslateOptions } from "./types";

const DEFAULTS = {
    provider:
        (process.env.LT_PROVIDER as "libretranslate" | "ftapi") ??
        "libretranslate",
    baseUrl: process.env.LT_BASE_URL,
    apiKey: process.env.LT_API_KEY,
};

export async function translate(
    opts: TranslateOptions | string
): Promise<string | string[]> {
    const options =
        typeof opts === "string" ? { query: opts, target: "en" } : opts;
    const provider = options.provider ?? DEFAULTS.provider;
    const baseUrl = options.baseUrl ?? DEFAULTS.baseUrl;

    if (provider === "ftapi") {
        const { text } = await ftapiTranslate(
            {
                query: options.query,
                source: options.source,
                target: options.target,
            },
            { baseUrl }
        );
        return text;
    }

    // provider === "libretranslate"
    const { text } = await libreTranslateTranslate(
        {
            query: options.query,
            source: options.source ?? "auto", // LibreTranslate soporta 'auto'
            target: options.target,
            format: options.format ?? "text",
        },
        { baseUrl: baseUrl ?? "http://localhost:5000", apiKey: DEFAULTS.apiKey }
    );
    return text;
}
