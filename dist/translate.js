"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectLanguage = exports.translate = void 0;
const ftapi_1 = require("./providers/ftapi");
// import { libreTranslate } from "./providers/libretranslate"; // el tuyo actual
const DEFAULTS = {
    provider: process.env.LT_PROVIDER ??
        "libretranslate",
    baseUrl: process.env.LT_BASE_URL, // opcional, respeta tu semántica actual
};
async function translate(opts) {
    const options = typeof opts === "string"
        ? { query: opts, target: "en" } // o como lo manejes ahora
        : opts;
    const provider = options.provider ?? DEFAULTS.provider;
    if (provider === "ftapi") {
        const { text } = await (0, ftapi_1.ftapiTranslate)({
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
exports.translate = translate;
async function detectLanguage(text, cfg) {
    const provider = cfg?.provider ?? DEFAULTS.provider;
    if (provider === "ftapi") {
        // FTAPI no expone /detect; hacemos un translate “barato”
        // truco: traducir a un idioma neutral (ej. "en") y leer source-language
        const { detectedSourceLang } = await (0, ftapi_1.ftapiTranslate)({
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
exports.detectLanguage = detectLanguage;
//# sourceMappingURL=translate.js.map