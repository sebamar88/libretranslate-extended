"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectLanguage = void 0;
// detectLanguage.ts
const libretranslate_1 = require("./providers/libretranslate");
const ftapi_1 = require("./providers/ftapi");
const DEFAULTS = {
    provider: process.env.LT_PROVIDER ??
        "libretranslate",
    baseUrl: process.env.LT_BASE_URL,
    apiKey: process.env.LT_API_KEY,
};
// ¡SIN recursión!
async function detectLanguage(text, cfg) {
    const provider = cfg?.provider ?? DEFAULTS.provider;
    const baseUrl = cfg?.baseUrl ?? DEFAULTS.baseUrl;
    if (provider === "ftapi") {
        // FTAPI no documenta endpoint /detect. Como workaround liviano:
        // hacemos una traducción a 'en' SIN 'sl', y NO asumimos que devuelve el source.
        // Si querés realmente el idioma, preferí siempre LibreTranslate /detect. :contentReference[oaicite:6]{index=6}
        await (0, ftapi_1.ftapiTranslate)({ query: text, target: "en" }, { baseUrl });
        throw new Error("FTAPI: language detection is not supported by the public docs");
    }
    // LibreTranslate: opción A (endpoint dedicado /detect)
    const det = await (0, libretranslate_1.libreTranslateDetect)(text, {
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
exports.detectLanguage = detectLanguage;
//# sourceMappingURL=detectLanguage.js.map