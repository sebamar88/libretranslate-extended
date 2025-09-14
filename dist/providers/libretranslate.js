// providers/libretranslate.ts
import fetch from "node-fetch";
export async function libreTranslateTranslate({ query, source = "auto", target, format = "text" }, cfg) {
    const res = await fetch(`${cfg.baseUrl}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            q: query,
            source,
            target,
            format,
            api_key: cfg.apiKey,
        }),
    });
    if (!res.ok) {
        throw new Error(`LibreTranslate HTTP ${res.status}: ${await res.text()}`);
    }
    const data = await res.json();
    // Según la referencia oficial, la respuesta incluye:
    // { translatedText, detectedLanguage?, alternatives? }
    // y puede ser string o array dependiendo de q. :contentReference[oaicite:3]{index=3}
    return {
        text: data.translatedText,
        detectedLanguage: data.detectedLanguage,
        alternatives: data.alternatives,
    };
}
export async function libreTranslateDetect(text, cfg) {
    const res = await fetch(`${cfg.baseUrl}/detect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text, api_key: cfg.apiKey }),
    });
    if (!res.ok) {
        throw new Error(`LibreTranslate /detect HTTP ${res.status}: ${await res.text()}`);
    }
    const list = await res.json();
    // La API devuelve un array; tomamos el top-1. :contentReference[oaicite:4]{index=4}
    if (!Array.isArray(list) || !list[0])
        throw new Error("Empty detection result");
    return list[0];
}
//# sourceMappingURL=libretranslate.js.map