// providers/ftapi.ts
import fetch from "node-fetch";
const DEFAULT_BASE = "https://ftapi.pythonanywhere.com";
export async function ftapiTranslate({ query, source, target }, cfg) {
    const base = cfg?.baseUrl ?? DEFAULT_BASE;
    const params = new URLSearchParams();
    params.set("dl", target);
    if (source && source !== "auto")
        params.set("sl", source);
    params.set("text", Array.isArray(query) ? query.join("\n") : query);
    const res = await fetch(`${base}/translate?${params.toString()}`);
    if (!res.ok)
        throw new Error(`FTAPI HTTP ${res.status}: ${await res.text()}`);
    const data = (await res.json()); // <- la doc muestra JSON con "source-language"
    return {
        text: data["destination-text"] ?? "",
        detectedSourceLang: data["source-language"], // <- usar esto para detectar idioma
    };
}
//# sourceMappingURL=ftapi.js.map