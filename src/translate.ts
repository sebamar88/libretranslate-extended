// translate.ts
import { ftapiTranslate } from "./providers/ftapi";
import { libreTranslateTranslate } from "./providers/libretranslate";
import { deeplTranslate } from "./providers/deepl";
import type { TranslateOptions } from "./types";
import "dotenv/config";

const DEFAULTS = {
    provider: "deepl" as const,
    apiKey: process.env.DEEPL_API_KEY,
    baseUrl: "",
};

export async function translate(
    opts: TranslateOptions | string
): Promise<string | string[]> {
    const options =
        typeof opts === "string" ? { query: opts, target: "en" } : opts;
    const provider = options.provider ?? DEFAULTS.provider;

    if (provider === "ftapi") {
        const { text } = await ftapiTranslate(
            {
                query: options.query,
                source: options.source,
                target: options.target,
            },
            { baseUrl: options.baseUrl ?? DEFAULTS.baseUrl }
        );
        return text;
    }

    if (provider === "deepl") {
        const { text } = await deeplTranslate(
            {
                query: options.query,
                source: options.source,
                target: options.target,
            },
            { apiKey: options.apiKey ?? process.env.DEEPL_API_KEY! }
        );
        return text;
    }

    const { text } = await libreTranslateTranslate(
        {
            query: options.query,
            source: options.source ?? "auto",
            target: options.target,
            format: options.format ?? "text",
        },
        {
            baseUrl:
                options.baseUrl ?? DEFAULTS.baseUrl ?? "http://localhost:5000",
            apiKey: DEFAULTS.apiKey,
        }
    );
    return text;
}
