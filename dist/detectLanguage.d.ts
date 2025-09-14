import type { ClientConfig } from "./types";
import "dotenv/config";
export declare function detectLanguage(text: string, cfg?: ClientConfig): Promise<string>;
