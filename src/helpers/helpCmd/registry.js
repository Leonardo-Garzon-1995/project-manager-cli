/**
 * @file registry.js
 * @description Central registry for all help definitions.
 */

import general from "./general.js";
import project from "./project.js";
import task from "./task.js";
import note from "./note.js";
// import notification from "./notification.js";

const commands = {
    project,
    task,
    note,
    // notification
};

function getCommand(name) {
    if (!name) {
        return general;
    }

    // Exact command name
    if (commands[name]) {
        return commands[name];
    }

    // Search aliases
    for (const command of Object.values(commands)) {
        if (command.aliases?.includes(name)) {
            return command;
        }
    }

    return null;
}

export default {
    general,
    commands,
    getCommand
};