"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectLanguage = exports.translate = void 0;
const API_URL = "https://lt.vern.cc";
// Traducción con error explícito si falla
const translate = async ({ query, source = "auto", target, format = "text", }) => {
    const res = await fetch(`${API_URL}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: query, source, target, format }),
    });
    if (!res.ok) {
        throw new Error(`Translation API error: ${res.status} ${res.statusText}`);
    }
    const result = await res.json();
    if (!result?.translatedText) {
        throw new Error(`Translation failed: ${JSON.stringify(result)}`);
    }
    return result.translatedText;
};
exports.translate = translate;
// Detección con validación estricta
const detectLanguage = async (text) => {
    const res = await fetch(`${API_URL}/detect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text.trim() }),
    });
    if (!res.ok) {
        throw new Error(`Detection API error: ${res.status} ${res.statusText}`);
    }
    const result = await res.json();
    if (!result ||
        !Array.isArray(result) ||
        result.length === 0 ||
        !result[0].language) {
        throw new Error(`Language detection failed: ${JSON.stringify(result)}`);
    }
    return result[0].language;
};
exports.detectLanguage = detectLanguage;
//# sourceMappingURL=translate.js.map