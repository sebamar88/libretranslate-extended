"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectLanguage = exports.translate = void 0;
const DEFAULT_API_URL = "https://libretranslate.com";
// Método para traducir
const translate = async ({ query, source, target, format, apiurl, apiKey, }) => {
    if (!apiurl && !apiKey) {
        throw new TypeError("You need an API key to use the public LibreTranslate API!");
    }
    if (!apiurl)
        apiurl = DEFAULT_API_URL;
    if (!source)
        source = "auto";
    const res1 = await fetch(`${apiurl}/languages`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const languages = await res1.json();
    const availableLanguages = [
        "auto",
        ...languages.map((l) => l.code),
    ];
    if (!availableLanguages.includes(source)) {
        throw new TypeError(`Source language "${source}" was not found/does not exist.`);
    }
    if (!availableLanguages.includes(target)) {
        throw new TypeError(`Target language "${target}" was not found/does not exist.`);
    }
    const res2 = await fetch(`${apiurl}/translate`, {
        method: "POST",
        body: JSON.stringify({
            q: query,
            source,
            target,
            format: format || "text",
            apiKey: apiKey || "",
        }),
        headers: { "Content-Type": "application/json" },
    });
    try {
        const t = await res2.json();
        return t.translatedText;
    }
    catch (err) {
        throw err;
    }
};
exports.translate = translate;
const detectLanguage = async (text, apiurl = DEFAULT_API_URL) => {
    try {
        const res = await fetch(apiurl.replace(/\/translate$/, "") + "/detect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ q: text.trim() }),
        });
        const result = await res.json();
        return result?.[0]?.language || "es";
    }
    catch (err) {
        throw new Error(`Language detection failed: ${err.message}`);
    }
};
exports.detectLanguage = detectLanguage;
//# sourceMappingURL=translate.js.map