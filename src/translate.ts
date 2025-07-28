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

// Obtener idiomas soportados
export const getLanguages = async (): Promise<Language[]> => {
    const res = await fetch(`${API_URL}/languages`);
    const langs = await res.json();
    return langs.map((l: any) => ({ code: l.code, name: l.name }));
};

// Cache simple para evitar múltiples fetch
let cachedLanguages: Language[] | null = null;

const ensureLanguages = async (): Promise<Language[]> => {
    if (!cachedLanguages) cachedLanguages = await getLanguages();
    return cachedLanguages;
};

// Obtener idioma por código o nombre
export const findLanguage = async (input: string) => {
    const langs = await ensureLanguages();
    const lower = input.toLowerCase();
    return langs.find(
        (l) => l.code.toLowerCase() === lower || l.name.toLowerCase() === lower
    );
};

// Utilidades para flags
const FLAGS: Record<string, string> = {
    en: "🇬🇧",
    es: "🇪🇸",
    fr: "🇫🇷",
    de: "🇩🇪",
    it: "🇮🇹",
    pt: "🇵🇹",
    ru: "🇷🇺",
    zh: "🇨🇳",
    ja: "🇯🇵",
    ko: "🇰🇷",
};

export const getLanguageFlag = (code: string) => FLAGS[code] || "🏳️";

// Obtener lista de idiomas con flags
export const getLanguagesWithFlags = async () => {
    const langs = await ensureLanguages();
    return langs.map((l) => ({
        ...l,
        flag: getLanguageFlag(l.code),
    }));
};
