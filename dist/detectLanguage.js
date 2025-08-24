"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectLanguage = void 0;
// detectLanguage.ts
const ftapi_1 = require("./providers/ftapi");
const libretranslate_1 = require("./providers/libretranslate");
const DEFAULTS = {
    provider: "ftapi",
    baseUrl: "https://ftapi.pythonanywhere.com",
    apiKey: process.env.LT_API_KEY,
};
async function detectLanguage(text, cfg) {
    const provider = cfg?.provider ?? DEFAULTS.provider;
    if (provider === "ftapi") {
        // Truco FTAPI: /translate sin 'sl' => autodetecta; leemos "source-language"
        const { detectedSourceLang } = await (0, ftapi_1.ftapiTranslate)({ query: text, target: "en" }, { baseUrl: cfg?.baseUrl ?? DEFAULTS.baseUrl });
        if (!detectedSourceLang)
            throw new Error("FTAPI: could not detect language");
        return detectedSourceLang;
    }
    // LibreTranslate: primero /detect; si falla, fallback a /translate con source:"auto"
    const baseUrl = cfg?.baseUrl ?? DEFAULTS.baseUrl ?? "http://localhost:5000";
    try {
        const det = await (0, libretranslate_1.libreTranslateDetect)(text, {
            baseUrl,
            apiKey: cfg?.apiKey ?? DEFAULTS.apiKey,
        });
        return det.language;
    }
    catch {
        const t = await (0, libretranslate_1.libreTranslateTranslate)({ query: text, source: "auto", target: "en" }, { baseUrl, apiKey: cfg?.apiKey ?? DEFAULTS.apiKey });
        const lang = Array.isArray(t.detectedLanguage)
            ? t.detectedLanguage[0]?.language
            : t.detectedLanguage?.language;
        if (!lang)
            throw new Error("LibreTranslate: detection failed via /translate fallback");
        return lang;
    }
}
exports.detectLanguage = detectLanguage;
//# sourceMappingURL=detectLanguage.js.map