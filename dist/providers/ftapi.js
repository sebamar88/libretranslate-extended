"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ftapiTranslate = void 0;
const tslib_1 = require("tslib");
// providers/ftapi.ts
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const DEFAULT_BASE = "https://ftapi.pythonanywhere.com";
async function ftapiTranslate({ query, source, target }, cfg) {
    // Doc pública: admite 'sl' (source), 'dl' (dest) y 'text'.
    // Si no mandás 'sl', autodetecta. No hay JSON formal documentado; la API expone un texto plano o JSON simple. :contentReference[oaicite:5]{index=5}
    const base = cfg?.baseUrl ?? DEFAULT_BASE;
    // La API pública documenta 2 formas vía querystring.
    // Implementamos una llamada directa simple:
    const params = new URLSearchParams();
    if (typeof query !== "string") {
        // FTAPI no documenta batch; concatenamos con separador seguro o hacé múltiples requests según tu necesidad.
        params.set("text", query.join("\n"));
    }
    else {
        params.set("text", query);
    }
    params.set("dl", target);
    if (source && source !== "auto")
        params.set("sl", source);
    const res = await (0, node_fetch_1.default)(`${base}/?${params.toString()}`);
    if (!res.ok)
        throw new Error(`FTAPI HTTP ${res.status}: ${await res.text()}`);
    const text = await res.text(); // Devuelve texto directo en la demo pública
    return { text };
}
exports.ftapiTranslate = ftapiTranslate;
//# sourceMappingURL=ftapi.js.map