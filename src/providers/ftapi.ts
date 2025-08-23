// providers/ftapi.ts
import fetch from "node-fetch";

export type FtapiConfig = {
    baseUrl?: string; // opcional, default público
};

type TranslateParams = {
    query: string | string[];
    source?: string; // 'auto' | 'es' | ...
    target: string; // 'en' | ...
};

export type FtapiResult = {
    text: string | string[];
    // FTAPI no documenta un campo estándar de idioma detectado
    detectedSourceLang?: string; // lo dejamos opcional y normalmente undefined
};

const DEFAULT_BASE = "https://ftapi.pythonanywhere.com";

export async function ftapiTranslate(
    { query, source, target }: TranslateParams,
    cfg?: FtapiConfig
): Promise<FtapiResult> {
    // Doc pública: admite 'sl' (source), 'dl' (dest) y 'text'.
    // Si no mandás 'sl', autodetecta. No hay JSON formal documentado; la API expone un texto plano o JSON simple. :contentReference[oaicite:5]{index=5}

    const base = cfg?.baseUrl ?? DEFAULT_BASE;

    // La API pública documenta 2 formas vía querystring.
    // Implementamos una llamada directa simple:
    const params = new URLSearchParams();
    if (typeof query !== "string") {
        // FTAPI no documenta batch; concatenamos con separador seguro o hacé múltiples requests según tu necesidad.
        params.set("text", query.join("\n"));
    } else {
        params.set("text", query);
    }
    params.set("dl", target);
    if (source && source !== "auto") params.set("sl", source);

    const res = await fetch(`${base}/?${params.toString()}`);
    if (!res.ok)
        throw new Error(`FTAPI HTTP ${res.status}: ${await res.text()}`);

    const text = await res.text(); // Devuelve texto directo en la demo pública
    return { text };
}
