import fs from "fs/promises";
import { CONFIG_DIR } from "./config-path.js";

// Creates a '.project-manager-cli' dir in the home dir
export async function ensureConfigDirectory() {
    await fs.mkdir(CONFIG_DIR, {
        recursive: true
    });
}