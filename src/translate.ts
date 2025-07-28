interface TranslateOptions {
    query: string;
    source?: string;
    target: string;
    format?: string;
    apiurl?: string;
    apiKey?: string;
}

const DEFAULT_API_URL = "https://lt.vern.cc";
const OFFICIAL_API_URL = "https://libretranslate.com";

export const translate = async ({
    query,
    source,
    target,
    format,
    apiurl,
    apiKey,
}: TranslateOptions) => {
    // Usa oficial si se pasa apiKey, sino fallback
    apiurl = apiurl || (apiKey ? OFFICIAL_API_URL : DEFAULT_API_URL);
    source = source || "auto";

    try {
        // Obtener idiomas disponibles
        const res1 = await fetch(`${apiurl}/languages`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const languages = await res1.json();

        const availableLanguages: string[] = [
            "auto",
            ...languages.map((l: any) => l.code),
        ];

        if (!availableLanguages.includes(source)) {
            throw new TypeError(`Source language "${source}" not supported.`);
        }
        if (!availableLanguages.includes(target)) {
            throw new TypeError(`Target language "${target}" not supported.`);
        }

        // Hacer la traducción
        const res2 = await fetch(`${apiurl}/translate`, {
            method: "POST",
            body: JSON.stringify({
                q: query,
                source,
                target,
                format: format || "text",
                apiKey: apiKey || "",
            }),
            headers: { "Content-Type": "application/json" },
        });

        const result = await res2.json();

        if (!result?.translatedText) {
            throw new Error(
                `Translation failed: ${
                    JSON.stringify(result) || "Unknown error"
                }`
            );
        }

        return result.translatedText;
    } catch (err: any) {
        // Si falla todo, no rompe: retorna null (modo manual)
        console.warn(
            `Translation failed: ${err.message}. Switching to manual mode.`
        );
        return null;
    }
};

// Detección de idioma
export const detectLanguage = async (
    text: string,
    apiurl: string = DEFAULT_API_URL
) => {
    try {
        const res = await fetch(
            apiurl.replace(/\/translate$/, "") + "/detect",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ q: text.trim() }),
            }
        );
        const result = await res.json();
        return result?.[0]?.language || "es";
    } catch (err: any) {
        console.warn(`Language detection failed: ${err.message}`);
        return "es";
    }
};
