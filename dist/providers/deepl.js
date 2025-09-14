"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deeplTranslate = void 0;
// providers/deepl.ts
const deepl = __importStar(require("deepl-node"));
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
async function deeplTranslate({ query, source, target }, cfg) {
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
exports.deeplTranslate = deeplTranslate;
