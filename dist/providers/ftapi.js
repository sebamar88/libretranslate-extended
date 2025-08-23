"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ftapiListLanguages = exports.ftapiTranslate = void 0;
const DEFAULT_BASE = "https://ftapi.pythonanywhere.com";
async function ftapiTranslate({ query, source, target, baseUrl = DEFAULT_BASE, }) {
    if (!query?.trim())
        throw new Error("Empty text");
    if (!target)
        throw new Error("Missing target language");
    const params = new URLSearchParams({ dl: target, text: query });
    if (source)
        params.set("sl", source);
    const res = await fetch(`${baseUrl}/translate?${params.toString()}`, {
        method: "GET",
    });
    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`FTAPI error ${res.status}: ${body}`);
    }
    const data = await res.json();
    const translated = data?.["destination-text"];
    if (typeof translated !== "string") {
        throw new Error("FTAPI: invalid response (missing destination-text)");
    }
    return {
        text: translated,
        detectedSourceLang: source ? undefined : data?.["source-language"],
        raw: data,
    };
}
exports.ftapiTranslate = ftapiTranslate;
async function ftapiListLanguages(baseUrl = DEFAULT_BASE) {
    const res = await fetch(`${baseUrl}/languages`, { method: "GET" });
    if (!res.ok)
        throw new Error(`FTAPI languages error ${res.status}`);
    const langs = await res.json();
    return Array.isArray(langs) ? langs : Object.keys(langs ?? {});
}
exports.ftapiListLanguages = ftapiListLanguages;
//# sourceMappingURL=ftapi.js.map