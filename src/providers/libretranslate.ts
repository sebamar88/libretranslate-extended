// providers/libretranslate.ts
import fetch from "node-fetch";

export type LibreTranslateConfig = {
    baseUrl: string; // ej: http://localhost:5000
    apiKey?: string; // requerido solo si tu instancia lo exige
};

type TranslateParams = {
    query: string | string[];
    source?: string; // 'auto' | 'es' | ...
    target: string; // 'en' | 'pt' | ...
    format?: "text" | "html";
};

export type TranslateResult = {
    text: string | string[];
    detectedLanguage?:
        | { language: string; confidence?: number }
        | Array<{ language: string; confidence?: number }>;
    alternatives?: string[] | string[][];
};

export async function libreTranslateTranslate(
    { query, source = "auto", target, format = "text" }: TranslateParams,
    cfg: LibreTranslateConfig
): Promise<TranslateResult> {
    const res = await fetch(`${cfg.baseUrl}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            q: query,
            source, // LibreTranslate soporta 'auto'
            target,
            format,
            api_key: cfg.apiKey,
        }),
    });

    if (!res.ok) {
        throw new Error(
            `LibreTranslate HTTP ${res.status}: ${await res.text()}`
        );
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

export async function libreTranslateDetect(
    text: string,
    cfg: LibreTranslateConfig
): Promise<{ language: string; confidence?: number }> {
    const res = await fetch(`${cfg.baseUrl}/detect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text, api_key: cfg.apiKey }),
    });
    if (!res.ok) {
        throw new Error(
            `LibreTranslate /detect HTTP ${res.status}: ${await res.text()}`
        );
    }
    const list: Array<{ language: string; confidence?: number }> =
        await res.json();
    // La API devuelve un array; tomamos el top-1. :contentReference[oaicite:4]{index=4}
    if (!Array.isArray(list) || !list[0])
        throw new Error("Empty detection result");
    return list[0];
}
