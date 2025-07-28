const API_URL = "https://lt.vern.cc";

interface TranslateOptions {
    query: string;
    source?: string;
    target: string;
    format?: string;
}

interface Language {
    code: string;
    name: string;
}

// Traducción básica
export const translate = async ({
    query,
    source = "auto",
    target,
    format = "text",
}: TranslateOptions) => {
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

// Detección de idioma
export const detectLanguage = async (text: string) => {
    const res = await fetch(`${API_URL}/detect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text.trim() }),
    });
    const result = await res.json();
    return result?.[0]?.language || "es";
};
