import fs from "fs/promises";
import { CONFIG_DIR } from "./config-path.js";

export async function ensureConfigDirectory() {
    await fs.mkdir(CONFIG_DIR, {
        recursive: true
    });
}