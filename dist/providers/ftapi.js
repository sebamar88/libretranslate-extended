"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ftapiTranslate = void 0;
// providers/ftapi.ts
const node_fetch_1 = __importDefault(require("node-fetch"));
const DEFAULT_BASE = "https://ftapi.pythonanywhere.com";
async function ftapiTranslate({ query, source, target }, cfg) {
    const base = cfg?.baseUrl ?? DEFAULT_BASE;
    const params = new URLSearchParams();
    params.set("dl", target);
    if (source && source !== "auto")
        params.set("sl", source);
    params.set("text", Array.isArray(query) ? query.join("\n") : query);
    const res = await (0, node_fetch_1.default)(`${base}/translate?${params.toString()}`);
    if (!res.ok)
        throw new Error(`FTAPI HTTP ${res.status}: ${await res.text()}`);
    const data = (await res.json()); // <- la doc muestra JSON con "source-language"
    return {
        text: data["destination-text"] ?? "",
        detectedSourceLang: data["source-language"], // <- usar esto para detectar idioma
    };
}
exports.ftapiTranslate = ftapiTranslate;
