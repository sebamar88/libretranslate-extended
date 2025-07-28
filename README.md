# LibreTranslate Extended (NPM)

[Original API](https://libretranslate.com/)

Extended API wrapper for LibreTranslate, an open-source alternative to Google Translate.  
Supports the official API as well as self-hosted instances, with **built-in language detection**.

## Installation

**Node.js v17.5.0 or newer with fetch is required.**

```bash

# NPM

npm install libretranslate-extended


# Yarn

yarn add libretranslate-extended

```

## Usage

```js
// CommonJS

const { translate, detectLanguage } = require("libretranslate-extended");

// ES Modules (ESM) or Typescript

import { translate, detectLanguage } from "libretranslate-extended";
```

Using `translate()` function.

```js
await translate({
    query: "text", // Text to be translated.

    source: "lang", // The original language. (auto by default)

    target: "lang", // The language to translate.

    format: "text", // The format of the translated text (HTML or Text) Optional

    apiurl: "URL", // Custom API url, if self-hosted

    apikey: "key", // API Key
});
```

Using `detectLanguage()` function.

```js
const lang = await detectLanguage("Bonjour tout le monde");
console.log(lang); // "fr"
```

### About

This package is based on the [`libretranslate`](https://www.npmjs.com/package/libretranslate) package,  
retrieved and extended from its last available version on npm.

The original project is no longer publicly maintained or hosted.  
This fork continues its development and is licensed under **AGPL-3.0-or-later**.

Modified and maintained by **Sebastián Martínez (sebamar88)**, 2025.  
See [LICENSE](./LICENSE) for details.
