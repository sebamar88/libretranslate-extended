# libretranslate-extended

[![npm version](https://img.shields.io/npm/v/libretranslate-extended.svg)](https://www.npmjs.com/package/libretranslate-extended)
[![license](https://img.shields.io/npm/l/libretranslate-extended.svg)](./LICENCE)

> Extended API wrapper for **LibreTranslate**, **DeepL** and **FTAPI**, with built-in language detection, TypeScript support and a unified interface.

---

## ✨ Features

-   🌍 Multi-provider support: **LibreTranslate**, **DeepL**, **FTAPI**
-   🔎 Built-in language detection
-   🧩 Unified API: mismo `translate()` sin importar el proveedor
-   ⚡ Written in TypeScript (tipos incluidos)
-   🛡️ Mejor manejo de errores

---

## 📦 Installation

```bash
npm install libretranslate-extended
# o
yarn add libretranslate-extended
```

---

## 🚀 Usage

### Translate text

```ts
import { translate } from "libretranslate-extended";

async function main() {
    const result = await translate(
        {
            query: "Hello, how are you?",
            source: "en", // optional, defaults to "auto" if supported
            target: "es", // target language
        },
        {
            provider: "deepl", // "deepl" | "libretranslate" | "ftapi"
            apiKey: process.env.DEEPL_API_KEY, // required for DeepL
        }
    );

    console.log(result);
    // → "Hola, ¿cómo estás?"
}

main();
```

### Detect language

```ts
import { detectLanguage } from "libretranslate-extended";

async function main() {
    const lang = await detectLanguage("Bonjour tout le monde", {
        provider: "deepl", // or "libretranslate", "ftapi"
        apiKey: process.env.DEEPL_API_KEY,
    });

    console.log(lang);
    // → "fr"
}

main();
```

---

## ⚙️ Configuration

Each provider has different options:

### 🔹 DeepL

-   `apiKey`: **required** (get one at [DeepL API](https://www.deepl.com/pro-api))
-   `source`: ISO-639-1 code (`"en"`, `"es"`, `"fr"`, etc.) or `"auto"`
-   `target`: required language code

### 🔹 LibreTranslate

-   `baseUrl`: URL of your LibreTranslate instance (default: `http://localhost:5000`)
-   `apiKey`: optional (depends on your server)

### 🔹 FTAPI

-   `baseUrl`: optional (default: `https://ftapi.pythonanywhere.com`)

---

## 📚 API

### `translate(options: TranslateOptions | string, cfg?: ClientConfig): Promise<string | string[]>`

-   `query`: text or array of texts to translate
-   `target`: target language code
-   `source`: optional source language code (`"auto"` supported)
-   `provider`: `"deepl" | "libretranslate" | "ftapi"`
-   `apiKey`: required for DeepL, optional for LibreTranslate

### `detectLanguage(text: string, cfg?: ClientConfig): Promise<string>`

-   `text`: input text
-   `cfg.provider`: provider to use
-   `cfg.apiKey`: required for DeepL

---

## 🛠 Development

Clone the repo and install dependencies:

```bash
git clone https://github.com/sebamar88/libretranslate-extended.git
cd libretranslate-extended
npm install
```

Build:

```bash
npm run build
```

---

## 📄 License

Licensed under [AGPL-3.0-or-later](./LICENCE).
© 2025 Sebastián Martínez
