import type { ClientConfig, TranslateOptions } from "./types";
import "dotenv/config";
export declare function translate(opts: TranslateOptions | string, conf: ClientConfig): Promise<string | string[]>;
