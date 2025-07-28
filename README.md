# LibreTranslate Extended (NPM)

[Original API](https://libretranslate.com/)

Extended API wrapper for LibreTranslate, an open-source alternative to Google Translate.  
Supports the official API as well as self-hosted instances, with **built-in language detection**.

[![npm version](https://img.shields.io/npm/v/libretranslate-extended.svg)](https://www.npmjs.com/package/libretranslate-extended)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Node.js](https://img.shields.io/badge/node-%3E%3D17.5.0-brightgreen)](https://nodejs.org/)

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
import { translate } from "libretranslate-extended";

const text = await translate({
    query: "Hello world",
    source: "en", // Optional (default: auto-detect)
    target: "es",
});

console.log(text); // "Hola mundo"
```

Using `detectLanguage()` function.

```js
import { detectLanguage } from "libretranslate-extended";

const lang = await detectLanguage("Bonjour tout le monde");
console.log(lang); // "fr"
```

### Available Methods

-   `translate(options: TranslateOptions): Promise<string>` - Translates text.
-   `detectLanguage(text: string): Promise<string>` - Detects the language of the given text.

### About

This package is based on the [`libretranslate`](https://www.npmjs.com/package/libretranslate) package,  
retrieved and extended from its last available version on npm.

The original project is no longer publicly maintained or hosted.  
This fork continues its development and is licensed under **AGPL-3.0-or-later**.

Modified and maintained by **Sebastián Martínez (sebamar88)**, 2025.  
See [LICENSE](./LICENSE) for details.
