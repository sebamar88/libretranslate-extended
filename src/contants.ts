import "dotenv/config";

export const DEFAULTS = {
    provider: "deepl" as const,
    apiKey: process.env.DEEPL_API_KEY,
    baseUrl: "",
};
