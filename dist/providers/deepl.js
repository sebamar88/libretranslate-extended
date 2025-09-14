// providers/deepl.ts
import * as deepl from "deepl-node";
function normalizeSource(source) {
    if (!source || source.toLowerCase() === "auto") {
        return null;
    }
    const map = {
        en: "en",
        es: "es",
        pt: "pt",
        nl: "nl",
    };
    const code = map[source.toLowerCase()];
    return (code ?? source.toUpperCase());
}
function normalizeTarget(target) {
    const map = {
        en: "en-US",
        es: "es",
        pt: "pt-BR",
        nl: "nl",
    };
    const code = map[target.toLowerCase()];
    return (code ?? target.toUpperCase());
}
export async function deeplTranslate({ query, source, target }, cfg) {
    const translator = new deepl.Translator(cfg.apiKey);
    const result = await translator.translateText(query, normalizeSource(source), normalizeTarget(target));
    if (Array.isArray(result)) {
        return {
            text: result.map((r) => r.text),
            detectedSourceLang: result[0]?.detectedSourceLang,
        };
    }
    return {
        text: result.text,
        detectedSourceLang: result.detectedSourceLang,
    };
}
//# sourceMappingURL=deepl.js.map