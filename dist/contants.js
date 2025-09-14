"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULTS = void 0;
require("dotenv/config");
exports.DEFAULTS = {
    provider: "ftapi",
    apiKey: process.env.FTAPI_API_KEY,
    baseUrl: "https://ftapi.pythonanywhere.com",
};
