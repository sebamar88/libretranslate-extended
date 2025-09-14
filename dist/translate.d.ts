import type { TranslateOptions } from "./types";
import "dotenv/config";
export declare function translate(opts: TranslateOptions | string): Promise<string | string[]>;
