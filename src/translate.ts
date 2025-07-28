interface TranslateOptions {
    query: string;
    source?: string;
    target: string;
    format?: string;
    apiurl?: string;
    apiKey?: string;
}

const DEFAULT_API_URL = "https://lt.vern.cc/translate";

// Método para traducir
export const translate = async ({
    query,
    source,
    target,
    format,
    apiurl,
    apiKey,
}: TranslateOptions) => {
    if (!apiurl && !apiKey) {
        throw new TypeError(
            "You need an API key to use the public LibreTranslate API!"
        );
    }

    if (!apiurl) apiurl = DEFAULT_API_URL;
    if (!source) source = "auto";

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
        throw new TypeError(
            `Source language "${source}" was not found/does not exist.`
        );
    }
    if (!availableLanguages.includes(target)) {
        throw new TypeError(
            `Target language "${target}" was not found/does not exist.`
        );
    }

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

    try {
        const t = await res2.json();
        return t.translatedText;
    } catch (err) {
        throw err;
    }
};

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
        throw new Error(`Language detection failed: ${err.message}`);
    }
};
