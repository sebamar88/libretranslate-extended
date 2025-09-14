// translate.ts
import { ftapiTranslate } from "./providers/ftapi";
import { libreTranslateTranslate } from "./providers/libretranslate";
import { deeplTranslate } from "./providers/deepl";
import type { ClientConfig, TranslateOptions } from "./types";
import "dotenv/config";
import { DEFAULTS } from "./contants";

export async function translate(
    opts: TranslateOptions | string,
    conf: ClientConfig
): Promise<string | string[]> {
    const options =
        typeof opts === "string" ? { query: opts, target: "en" } : opts;
    const provider = conf.provider ?? DEFAULTS.provider;

    if (provider === "ftapi") {
        const { text } = await ftapiTranslate(
            {
                query: options.query,
                source: options.source,
                target: options.target,
            },
            { baseUrl: conf.baseUrl ?? DEFAULTS.baseUrl }
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
            { apiKey: conf.apiKey ?? process.env.DEEPL_API_KEY! }
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
                conf.baseUrl ?? DEFAULTS.baseUrl ?? "http://localhost:5000",
            apiKey: conf.apiKey ?? DEFAULTS.apiKey,
        }
    );
    return text;
}
