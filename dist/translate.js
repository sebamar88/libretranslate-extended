"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguagesWithFlags = exports.getLanguageFlag = exports.findLanguage = exports.getLanguages = exports.detectLanguage = exports.translate = void 0;
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
// Obtener idiomas soportados
const getLanguages = async () => {
    const res = await fetch(`${API_URL}/languages`);
    const langs = await res.json();
    return langs.map((l) => ({ code: l.code, name: l.name }));
};
exports.getLanguages = getLanguages;
// Cache simple para evitar múltiples fetch
let cachedLanguages = null;
const ensureLanguages = async () => {
    if (!cachedLanguages)
        cachedLanguages = await (0, exports.getLanguages)();
    return cachedLanguages;
};
// Obtener idioma por código o nombre
const findLanguage = async (input) => {
    const langs = await ensureLanguages();
    const lower = input.toLowerCase();
    return langs.find((l) => l.code.toLowerCase() === lower || l.name.toLowerCase() === lower);
};
exports.findLanguage = findLanguage;
// Utilidades para flags
const FLAGS = {
    en: "🇬🇧",
    es: "🇪🇸",
    fr: "🇫🇷",
    de: "🇩🇪",
    it: "🇮🇹",
    pt: "🇵🇹",
    ru: "🇷🇺",
    zh: "🇨🇳",
    ja: "🇯🇵",
    ko: "🇰🇷",
};
const getLanguageFlag = (code) => FLAGS[code] || "🏳️";
exports.getLanguageFlag = getLanguageFlag;
// Obtener lista de idiomas con flags
const getLanguagesWithFlags = async () => {
    const langs = await ensureLanguages();
    return langs.map((l) => ({
        ...l,
        flag: (0, exports.getLanguageFlag)(l.code),
    }));
};
exports.getLanguagesWithFlags = getLanguagesWithFlags;
//# sourceMappingURL=translate.js.map