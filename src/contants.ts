import "dotenv/config";

export const DEFAULTS = {
    provider: "ftapi",
    apiKey: process.env.FTAPI_API_KEY,
    baseUrl: "https://ftapi.pythonanywhere.com",
};
