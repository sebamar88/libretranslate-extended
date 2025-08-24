// providers/ftapi.ts
import fetch from "node-fetch";

export type FtapiConfig = { baseUrl?: string };
type TranslateParams = {
    query: string | string[];
    source?: string;
    target: string;
};
export type FtapiResult = {
    text: string | string[];
    detectedSourceLang?: string;
};

const DEFAULT_BASE = "https://ftapi.pythonanywhere.com";

type FtapiJson = {
    ["source-language"]?: string;
    ["source-text"]?: string;
    ["destination-language"]?: string;
    ["destination-text"]?: string;
};

export async function ftapiTranslate(
    { query, source, target }: TranslateParams,
    cfg?: FtapiConfig
): Promise<FtapiResult> {
    const base = cfg?.baseUrl ?? DEFAULT_BASE;
    const params = new URLSearchParams();
    params.set("dl", target);
    if (source && source !== "auto") params.set("sl", source);
    params.set("text", Array.isArray(query) ? query.join("\n") : query);

    const res = await fetch(`${base}/translate?${params.toString()}`);
    if (!res.ok)
        throw new Error(`FTAPI HTTP ${res.status}: ${await res.text()}`);

    const data = (await res.json()) as FtapiJson; // <- la doc muestra JSON con "source-language"
    return {
        text: data["destination-text"] ?? "",
        detectedSourceLang: data["source-language"], // <- usar esto para detectar idioma
    };
}
