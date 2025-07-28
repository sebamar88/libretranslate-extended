const API_URL = "https://lt.vern.cc";

interface TranslateOptions {
    query: string;
    source?: string; // Puede ser un código de idioma o "auto"
    target: string;
    format?: string; // text o html
}

interface LanguageDetection {
    language: string;
    confidence?: number;
}

// Traducción con error explícito si falla
export const translate = async ({
    query,
    source = "auto",
    target,
    format = "text",
}: TranslateOptions): Promise<string> => {
    const res = await fetch(`${API_URL}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: query, source, target, format }),
    });

    if (!res.ok) {
        throw new Error(
            `Translation API error: ${res.status} ${res.statusText}`
        );
    }

    const result = await res.json();
    if (!result?.translatedText) {
        throw new Error(`Translation failed: ${JSON.stringify(result)}`);
    }

    return result.translatedText;
};

// Detección con validación estricta
export const detectLanguage = async (text: string): Promise<string> => {
    const res = await fetch(`${API_URL}/detect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text.trim() }),
    });

    if (!res.ok) {
        throw new Error(`Detection API error: ${res.status} ${res.statusText}`);
    }

    const result: LanguageDetection[] = await res.json();
    if (
        !result ||
        !Array.isArray(result) ||
        result.length === 0 ||
        !result[0].language
    ) {
        throw new Error(`Language detection failed: ${JSON.stringify(result)}`);
    }

    return result[0].language;
};
