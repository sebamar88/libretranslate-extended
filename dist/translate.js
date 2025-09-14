// translate.ts
import { ftapiTranslate } from "./providers/ftapi";
import { libreTranslateTranslate } from "./providers/libretranslate";
import { deeplTranslate } from "./providers/deepl";
const DEFAULTS = {
    provider: "ftapi",
    baseUrl: "https://ftapi.pythonanywhere.com",
    apiKey: process.env.LT_API_KEY,
};
export async function translate(opts) {
    const options = typeof opts === "string" ? { query: opts, target: "en" } : opts;
    const provider = options.provider ?? DEFAULTS.provider;
    if (provider === "ftapi") {
        const { text } = await ftapiTranslate({
            query: options.query,
            source: options.source,
            target: options.target,
        }, { baseUrl: options.baseUrl ?? DEFAULTS.baseUrl });
        return text;
    }
    if (provider === "deepl") {
        const { text } = await deeplTranslate({
            query: options.query,
            source: options.source,
            target: options.target,
        }, { apiKey: options.apiKey ?? process.env.DEEPL_API_KEY });
        return text;
    }
    const { text } = await libreTranslateTranslate({
        query: options.query,
        source: options.source ?? "auto",
        target: options.target,
        format: options.format ?? "text",
    }, {
        baseUrl: options.baseUrl ?? DEFAULTS.baseUrl ?? "http://localhost:5000",
        apiKey: DEFAULTS.apiKey,
    });
    return text;
}
//# sourceMappingURL=translate.js.map