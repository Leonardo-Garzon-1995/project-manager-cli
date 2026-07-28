import dotenv from "dotenv";
import fs from "node:fs/promises";

import { ENV_PATH } from "./config-path.js";
import { ensureConfigDirectory } from "./setup.js";

export async function initializeEnvironment() {

    await ensureConfigDirectory();

    try {
        await fs.access(ENV_PATH);
    } catch {
        await fs.writeFile(
            ENV_PATH,
            `RESEND_API_KEY=
            EMAIL=
            `,
            "utf8"
        );
    }

    dotenv.config({
        path: ENV_PATH,
        quiet: true
    });
}