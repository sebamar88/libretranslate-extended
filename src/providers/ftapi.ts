// src/providers/ftapi.ts
export type FTAPITranslateParams = {
    query: string;
    source?: string | null; // undefined/null => autodetect
    target: string;
    baseUrl?: string; // por si querés apuntar a un mirror
};

type FTAPIResponse = {
    ["source-language"]?: string;
    ["source-text"]?: string;
    ["destination-language"]?: string;
    ["destination-text"]?: string;
    pronunciation?: {
        ["source-text-phonetic"]?: string | null;
        ["source-text-audio"]?: string | null;
        ["destination-text-audio"]?: string | null;
    };
    translations?: {
        ["all-translations"]?: any;
        ["possible-translations"]?: string[] | null;
        ["possible-mistakes"]?: string[] | null;
    };
    definitions?: Array<{
        ["part-of-speech"]?: string | null;
        definition?: string | null;
        example?: string | null;
        ["other-examples"]?: string[] | null;
        synonyms?: Record<string, string[]> | null;
    }> | null;
    ["see-also"]?: string[] | null;
};

const DEFAULT_BASE = "https://ftapi.pythonanywhere.com";

export async function ftapiTranslate({
    query,
    source,
    target,
    baseUrl = DEFAULT_BASE,
}: FTAPITranslateParams): Promise<{
    text: string;
    detectedSourceLang?: string;
    raw: FTAPIResponse;
}> {
    if (!query?.trim()) throw new Error("Empty text");
    if (!target) throw new Error("Missing target language");

    const params = new URLSearchParams({ dl: target, text: query });
    if (source) params.set("sl", source);

    const res = await fetch(`${baseUrl}/translate?${params.toString()}`, {
        method: "GET",
    });
    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`FTAPI error ${res.status}: ${body}`);
    }

    const data: FTAPIResponse = await res.json();
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

export async function ftapiListLanguages(
    baseUrl = DEFAULT_BASE
): Promise<string[]> {
    const res = await fetch(`${baseUrl}/languages`, { method: "GET" });
    if (!res.ok) throw new Error(`FTAPI languages error ${res.status}`);
    const langs = await res.json();
    return Array.isArray(langs) ? langs : Object.keys(langs ?? {});
}
