"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectLanguage = exports.translate = void 0;
const API_URL = "https://lt.vern.cc";
// Traducción básica
const translate = async ({ query, source = "auto", target, format = "text", }) => {
    const res = await fetch(`${API_URL}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: query, source, target, format }),
    });
    const result = await res.json();
    if (!result?.translatedText) {
        throw new Error(`Translation failed: ${JSON.stringify(result)}`);
    }
    return result.translatedText;
};
exports.translate = translate;
// Detección de idioma
const detectLanguage = async (text) => {
    const res = await fetch(`${API_URL}/detect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text.trim() }),
    });
    const result = await res.json();
    return result?.[0]?.language || "es";
};
exports.detectLanguage = detectLanguage;
//# sourceMappingURL=translate.js.map