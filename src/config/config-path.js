import os from "os";
import path from "path";

export const CONFIG_DIR = path.join(
    os.homedir(),
    ".project-manager-cli"
);

export const ENV_PATH = path.join(CONFIG_DIR, ".env");