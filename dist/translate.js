"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
// translate.ts
const ftapi_1 = require("./providers/ftapi");
const libretranslate_1 = require("./providers/libretranslate");
const DEFAULTS = {
    provider: "ftapi",
    baseUrl: "https://ftapi.pythonanywhere.com",
    apiKey: process.env.LT_API_KEY,
};
async function translate(opts) {
    const options = typeof opts === "string" ? { query: opts, target: "en" } : opts;
    const provider = options.provider ?? DEFAULTS.provider;
    if (provider === "ftapi") {
        const { text } = await (0, ftapi_1.ftapiTranslate)({
            query: options.query,
            source: options.source,
            target: options.target,
        }, { baseUrl: options.baseUrl ?? DEFAULTS.baseUrl });
        return text;
    }
    const { text } = await (0, libretranslate_1.libreTranslateTranslate)({
        query: options.query,
        source: options.source ?? "auto",
        target: options.target,
        format: options.format ?? "text",
    }, {
        baseUrl: options.baseUrl ?? DEFAULTS.baseUrl ?? "http://localhost:5000",
        apiKey: DEFAULTS.apiKey,
    });
    return text;
}
exports.translate = translate;
//# sourceMappingURL=translate.js.map